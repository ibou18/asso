const mongoose = require("mongoose");
const { isEmail } = require("validator");

const TokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      max: 1024,
    },
    mail: {
      type: String,
      validate: [isEmail],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("token", TokenSchema);
