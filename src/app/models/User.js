const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    mail: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", schema);
