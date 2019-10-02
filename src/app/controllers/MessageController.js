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

class MessageController {
  async index(req, res) {
    return res.render("new_message.njk");
  }

  async findAll(req, res) {
    const messages = await Message.find()
      .then(data => {
        return res.status(200).render("messages.njk", { messages: data });
      })
      .catch(error => {
        return res.status(404).json(error);
      });
  }

  async find(req, res) {
    const message = await Message.find({ _id: req.params.id })
      .then(data => {
        if (data.length === 0) {
          return res
            .status(404)
            .json({ error: true, message: "Message not found" });
        }

        return res.status(200).json(data);
      })
      .catch(error => {
        return res
          .status(404)
          .json({ error: true, message: "Message not found" });
      });
  }

  async create(req, res) {
    let { networkType, messageType, data } = req.body;

    if (networkType === undefined) {
      return res.status(404).json({
        error: true,
        message: "You forgot to specify the Network Type: GSM or CDMA"
      });
    }

    if (messageType === undefined) {
      return res.status(404).json({
        error: true,
        message: "You forgot to specify the Message Type: Text or Sequence"
      });
    }

    if (data === undefined) {
      return res.status(404).json({
        error: true,
        message: "You forgot to specify the Data to be processed"
      });
    }

    let processedData;

    networkType = networkType.toLowerCase();
    messageType = messageType.toLowerCase();

    if (messageType === "text") {
      processedData = encoder(data.toUpperCase(), networkType);
    } else if (messageType.toLowerCase() === "sequence") {
      processedData = decoder(data.toUpperCase(), networkType);
    }

    for (var key in processedData) {
      if (key === "error") {
        return res.status(404).json(processedData);
      }
    }

    const resultJson = {
      userId: req.session.user._id,
      networkType,
      messageType,
      data,
      output: processedData.output
    };

    const message = await Message.create(resultJson)
      .then(data => {
        return res.status(201).render("dashboard.njk");
      })
      .catch(error => {
        return res.status(404).json(error);
      });
  }
}

encoder = (data, networkType) => {
  var encodedMessage = "";
  var lastKey = "";

  if (networkType === "gsm") {
    if (data.length > 255) {
      return {
        error: true,
        message: "The string length is greater than 255 chars for GSM Network"
      };
    }
  } else if (networkType === "cdma") {
    if (data.length > 160) {
      return {
        error: true,
        message: "The string length is greater than 160 chars for CDMA Network"
      };
    }
  }

  let regexPattern = /[!@#$%^&*(),.?":{}|<>]/;

  if (data.match(regexPattern)) {
    return {
      error: true,
      message: "The message contains special characters that is not permitted"
    };
  }

  var charFound = false;
  var extraMessage = "";

  for (var pos = 0; pos < data.length; pos++) {
    charFound = false;

    if (data[pos] === " ") {
      encodedMessage += 0;
      lastKey = 0;
      continue;
    }

    var index = -1;

    Object.keys(keyboard).forEach(key => {
      index = keyboard[key].indexOf(data[pos]);

      if (index !== -1) {
        charFound = true;

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
      extraMessage = `Char ${data[pos]} not found at Keyboard's Map`;
    }
  }

  if (extraMessage) {
    return { output: encodedMessage, extraMessage };
  } else {
    return { output: encodedMessage };
  }
};

decoder = data => {
  var textMessage = "";
  var extraMessage;
  var letterFound;

  var run = true;
  var pos = 0;
  var index = 0;

  while (run) {
    var key = data.substr(pos, 1);
    var nextKey = data.substr(pos + 1, 1);

    if (pos >= data.length - 1) {
      run = false;
    }

    if (key === "_") {
      index = 0;
      pos += 1;
      continue;
    }

    let regexPattern = /\d/;

    if (!regexPattern.test(key)) {
      return {
        error: true,
        message:
          "The sequence contains special characters that is not permitted"
      };
    }

    if (Number(key) === 0) {
      index = 0;
      pos += 1;
      textMessage += " ";
      continue;
    }

    if (Number(key) === Number(nextKey)) {
      index += 1;
      pos += 1;
      nextKey = data.substr(pos, 1);
      continue;
    }

    var keyData = keyboard[key];

    if (keyData === undefined) {
      extraMessage = `Button ${key} not found at Keyboard's Map`;
      index = 0;
      pos += 1;
      continue;
    }

    letterFound = keyData.substr(index, 1);

    textMessage += letterFound;

    index = 0;
    pos += 1;
  }

  if (extraMessage) {
    return { extraMessage, output: textMessage };
  }

  return { output: textMessage };
};

module.exports = new MessageController();
