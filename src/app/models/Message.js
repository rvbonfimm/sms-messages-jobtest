const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    networkType: {
      type: ["GSM", "CDMA"],
      required: true
    },
    messageType: {
      type: ["Message", "Sequence"],
      required: true
    },
    data: {
      type: String,
      required: true
    },
    output: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Message", schema);
