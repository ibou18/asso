const mongoose = require("mongoose");

const ContributionSchema = new mongoose.Schema(
  {
    by: {
      type: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        name: String,
      },
    },
    contributorID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      enum: ["Q", "Q1", "Q2", "Q3"],
      default: "Q1",
      required: true,
    },
    period: {
      type: String,
      default: new Date().getFullYear(),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contribution", ContributionSchema);
