const Message = require("../models/Message");

const keyboard = {
  2: "ABC",
  3: "DEF",
  4: "GHI",
  5: "JKL",
  6: "MNO",
  7: "PQRS",
  8: "TUV",
  9: "WXYZ"
};

// const specialCharsKeyboard = {
//   2: "áàãâäÁÀÃÂçÇ",
//   3: "éèêëÉÈÊ",
//   4: "íìîïÍÌÎ",
//   6: "óòõôöÓÒÔÔ",
//   8: "úùûüÚÙÛ"
// };

class MessageController {
  async findAll(req, res) {
    const messages = await Message.find()
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(error => {
        return res.status(404).send();
      });
  }

  async find(req, res) {
    const message = await Message.find({ _id: req.params.id })
      .then(data => {
        if (data.length === 0) {
          return res.status(404).send();
        }

        return res.status(200).json(data);
      })
      .catch(error => {
        return res.status(404).send();
      });
  }

  async create(req, res) {
    const message = await Message.create(req.body)
      .then(data => {
        return res.status(201).json(data);
      })
      .catch(error => {
        return res.status(404).send();
      });
  }

  encoder(req, res) {
    const { message } = req.body;

    var encodedMessage = "";
    var lastKey = "";

    if (message.length > 255) {
      return res.json({
        error: true,
        message: "The string length is greater than 255 chars."
      });
    }

    if (!message.match(/[A-Za-z\ ]/)) {
      return res.json({
        error: true,
        message:
          "The message contains special characters that is not permitted."
      });
    }

    var charFound = false;
    var extraMessage = "";

    for (var pos = 0; pos < message.length; pos++) {
      charFound = false;

      console.log("Input char ==> " + message[pos]);

      if (message[pos] === " ") {
        console.log("Empty char registered");
        encodedMessage += 0;
        lastKey = 0;
        continue;
      }

      var index = -1;

      // switch (message[char]) {
      //   case /[áàãâä]/:
      //     message[char] = "a";
      //     index = 0;
      //     break;
      //   case /[ÁÀÃÂ]/:
      //     message[char] = "A";
      //     index = 0;
      //     break;
      //   case /[ç]/:
      //     message[char] = "c";
      //     index = 2;
      //     break;
      //   case /[Ç]/:
      //     message[char] = "C";
      //     index = 2;
      //     break;
      //   case /[éèêë]/:
      //     message[char] = "e";
      //     index = 1;
      //     break;
      //   case /[ÉÈÊ]/:
      //     message[char] = "E";
      //     index = 1;
      //     break;
      //   case /[íìîï]/:
      //     message[char] = "i";
      //     index = 2;
      //     break;
      //   case /[ÍÌÎ]/:
      //     message[char] = "I";
      //     index = 2;
      //     break;
      //   case /[óòõôö]/:
      //     message[char] = "o";
      //     index = 2;
      //     break;
      //   case /[ÓÒÔÔ]/:
      //     message[char] = "O";
      //     index = 2;
      //     break;
      //   case /[úùûü]/:
      //     message[char] = "u";
      //     index = 1;
      //     break;
      //   case /[ÚÙÛ]/:
      //     message[char] = "U";
      //     index = 1;
      //     break;
      // }

      Object.keys(keyboard).forEach(key => {
        index = keyboard[key].indexOf(message[pos]);

        if (index !== -1) {
          charFound = true;

          console.log(
            "Char " +
              message[pos] +
              " found at Data: " +
              keyboard[key] +
              "(Key: " +
              key +
              ") Last Key: " +
              lastKey
          );

          if (lastKey === key) {
            encodedMessage += "_";
          }

          while (index !== -1) {
            encodedMessage += key;
            index -= 1;
          }

          lastKey = key;
        }
      });

      if (!charFound) {
        extraMessage = `Char ${message[pos]} not found at Characters Map.`;
      }

      console.log("---------------------------------------------");
    }

    console.log(`Sequence char of "${message}" message: \"${encodedMessage}\"`);

    if (extraMessage) {
      return res.json({ output: encodedMessage, extraMessage });
    } else {
      return res.json({ output: encodedMessage });
    }
  }

  decoder(req, res) {
    const { sequence } = req.body;

    var textMessage = "";

    var run = true;
    var pos = 0;
    var index = 0;

    console.log(`---------------------------------------------------------`);

    console.log(
      `Initial Sequence: "${sequence}" - Length: <${sequence.length - 1}>`
    );

    while (run) {
      var key = sequence.substr(pos, 1);
      var nextKey = sequence.substr(pos + 1, 1);

      console.log(
        `Key: ${key} - Next: ${nextKey} (Pos: ${pos} - Index: ${index})`
      );

      if (pos >= sequence.length - 1) {
        run = false;
      }

      if (key === "_") {
        index = 0;
        pos += 1;
        console.log(`==> Underscore found`);
        continue;
      }

      if (Number(key) === 0) {
        index = 0;
        pos += 1;
        console.log(`==> Zero found`);
        textMessage += " ";
        continue;
      }

      if (Number(key) === Number(nextKey)) {
        index += 1;
        pos += 1;
        nextKey = sequence.substr(pos, 1);
        continue;
      }

      // Get the found Letter
      var keyData = keyboard[key];

      var letterFound = keyData.substr(index, 1);

      textMessage += letterFound;

      index = 0;
      pos += 1;

      console.log(`Word mounted: ==> ${textMessage}`);
      console.log(`-----------------------------------------`);
    }

    console.log(`Output Text Message for Sequence ${sequence}: ${textMessage}`);

    return res.json({ output: textMessage });
  }
}

module.exports = new MessageController();
