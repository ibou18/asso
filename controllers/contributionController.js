const contributionModel = require("../models/contributionModel");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllContributions = (req, res) => {
  contributionModel
    .find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get data : " + err);
    })
    .sort({ createdAt: -1 });
};

module.exports.createContribution = async (req, res) => {
  const newContribution = new contributionModel({
    amount: req.body.amount,
    contributorID: req.body.contributorID,
    label: req.body.label,
    period: req.body.period,
    by: req.body.user,
  });
  try {
    const contribution = await newContribution.save();
    return res.status(201).json(contribution);
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.contributionInfo = async (req, res) => {
  const filter = { contributorID: req.params.id };
  //   if (!ObjectID.isValid(req.params.id))
  //     return res.status(400).send("ID inconnu : " + req.params.id);
  //   contributionModel
  //     .find(
  //       { contributorID: req.params.id },
  //       { $group: { period: "2021" } },
  //       (err, docs) => {
  //         if (!err) res.send(docs);
  //         else return res.status(400).send("error : " + err);
  //       }
  //     )
  //     .select();
  const query = contributionModel.find({
    contributorID: req.params.id,
    period: "2021",
  });
  query.getFilter();
  //   //   Subsequent chained calls merge new properties into the filter
  //   query.find({ periode: "2021" });
  query.getFilter(); // `{ name: 'Jean-Luc Picard', age: { $gt: 50 } }`
  let data = await query.exec();
  res.status(200).send(data);
};

module.exports.updateContribution = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu  : " + req.params.id);
  const updatedRecord = {
    amount: req.body.amount,
    contributorID: req.body.contributorID,
    label: req.body.label,
    period: req.body.period,
  };
  contributionModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updatedRecord },
    { upsert: true, new: true, useFindAndModify: false },
    (err, docs) => {
      if (!err) res.send(docs);
      else res.status(400).json({ message: "Erreur de modification." });
    }
  );
};

module.exports.deleteContribution = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);
  contributionModel.findOneAndRemove({ _id: req.params.id }, (err, docs) => {
    if (!err)
      res.status(200).json({ message: "depense supprime avec succes." });
    else res.status(400).json({ message: "erreur de supression." });
  });
};
