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
      extraMessage = `Button ${data[pos]} not found at Keyboard's Map`;
    }
  }

  if (extraMessage) {
    return { output: encodedMessage, extraMessage };
  } else {
    return { output: encodedMessage };
  }
};

describe("Encoder texts tests", () => {
  it("should return expected output based on input", () => {
    const output = encoder("TESTE DE MESA", "GSM");

    expect(output).toMatchObject({ output: "833777783303_33063377772" });
  });

  it("should not process the GSM network type by data greater than 255 characters", () => {
    let data =
      "TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE";
    const output = encoder(data, "gsm");

    expect(output).toMatchObject({
      error: true,
      message: "The string length is greater than 255 chars for GSM Network"
    });
  });

  it("should not process the CDMA network type by data greater than 160 characters", () => {
    let data =
      "TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE DE MESA TESTE TESTE";

    const output = encoder(data, "cdma");

    expect(output).toMatchObject({
      error: true,
      message: "The string length is greater than 160 chars for CDMA Network"
    });
  });

  it("should not process the TEXT message by having special chars", () => {
    let data = "TESTE DE@ MESA";

    const output = encoder(data, "gsm");

    expect(output).toMatchObject({
      error: true,
      message: "The message contains special characters that is not permitted"
    });
  });

  it("should return the NOT FOUND chars of the keyboard of the TEXT message", () => {
    let data = "TESTE DE1 MESA";

    const output = encoder(data, "gsm");

    expect(output).toMatchObject({
      extraMessage: "Button 1 not found at Keyboard's Map",
      output: "833777783303_33063377772"
    });
  });
});
