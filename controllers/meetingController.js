const meetingModel = require("../models/meetingModel");
const UserModel = require("../models/userModel");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllMeetings = (req, res) => {
  meetingModel
    .find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get data : " + err);
    })
    .sort({ createdAt: -1 });
};

module.exports.createMeeting = async (req, res) => {
  const newMeeting = new meetingModel({
    by: req.body.user,
    objective: req.body.objective,
    date: req.body.date,
    startAt: req.body.startAt,
    EndAt: req.body.EndAt,
    report: req.body.report,
    nextMeeting: req.body.nextMeeting,
    participants: req.body.participants,
  });
  try {
    const post = await newMeeting.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.meetingInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);
  meetingModel
    .findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else return res.status(400).send("ID inconnu : " + req.params.id);
    })
    .select();
};

module.exports.updateMeeting = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);
  const updatedRecord = {
    objective: req.body.objective,
    date: req.body.date,
    startAt: req.body.startAt,
    EndAt: req.body.EndAt,
    report: req.body.report,
    nextMeeting: req.body.nextMeeting,
    participants: req.body.participants,
  };
  meetingModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updatedRecord },
    { upsert: true, new: true, useFindAndModify: false },
    (err, docs) => {
      if (!err) res.send(docs);
      else res.status(400).json({ message: "Erreur de modification." });
    }
  );
};

module.exports.deleteMeeting = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);
  meetingModel.findOneAndRemove({ _id: req.params.id }, (err, docs) => {
    if (!err)
      res.status(200).json({ message: "meeting supprime avec succes." });
    else res.status(400).json({ message: "erreur de supression." });
  });
};
