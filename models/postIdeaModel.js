const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 10000,
    },
    comments: {
      type: [
        {
          commenterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          commenterName: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("postIdea", PostSchema);
