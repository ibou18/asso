const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema(
  {
    by: {
      type: { name: String, id: mongoose.Schema.Types.ObjectId },
      require: true,
    },
    report: {
      type: String,
      trim: true,
      maxlength: 10000,
    },
    objective: {
      type: String,
      require: true,
      maxlength: 10000,
    },
    participants: {
      type: [
        {
          participantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          name: String,
        },
      ],
      required: true,
    },
    startAt: {
      type: String,
      require: true,
    },
    endAt: {
      type: String,
      require: true,
    },
    date: {
      type: String,
      require: true,
      default: new Date(),
    },
    nextMeeting: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("meeting", MeetingSchema);
