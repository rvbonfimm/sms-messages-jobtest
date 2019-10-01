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

describe("Decoder sequences tests", () => {
  it("should return expected output based on input", () => {
    const output = decoder("833777783303_33063377772", "GSM");

    expect(output).toMatchObject({ output: "TESTE DE MESA" });
  });

  it("should not process the SEQUENCE message by having special chars", () => {
    let data = "83377#7833 3_33063377772";

    const output = decoder(data, "gsm");

    expect(output).toMatchObject({
      error: true,
      message: "The sequence contains special characters that is not permitted"
    });
  });

  it("should return the NOT FOUND char of the keyboard of the SEQUENCE message", () => {
    let data = "833777183303_33063377772";

    const output = decoder(data, "gsm");

    expect(output).toMatchObject({
      extraMessage: "Button 1 not found at Keyboard's Map"
    });
  });
});
