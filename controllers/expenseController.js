const expenseModel = require("../models/expenseModel");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllExpenses = (req, res) => {
  expenseModel
    .find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get data : " + err);
    })
    .sort({ createdAt: -1 });
};

module.exports.createExpense = async (req, res) => {
  const newExpense = new expenseModel({
    user: req.body.user,
    amount: req.body.amount,
    description: req.body.description,
  });
  try {
    const expense = await newExpense.save();
    return res.status(201).json(expense);
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.expenseInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);
  expenseModel
    .findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else return res.status(400).send("ID inconnu ee: " + req.params.id);
    })
    .select("-password");
};

module.exports.updateExpense = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);
  const updatedRecord = {
    description: req.body.description,
    amount: req.body.amount,
  };
  expenseModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updatedRecord },
    { upsert: true, new: true, useFindAndModify: false },
    (err, docs) => {
      if (!err) res.send(docs);
      else res.status(400).json({ message: "Erreur de modification." });
    }
  );
};

module.exports.deleteExpense = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);
  expenseModel.findOneAndRemove({ _id: req.params.id }, (err, docs) => {
    if (!err)
      res.status(200).json({ message: "depense supprime avec succes." });
    else res.status(400).json({ message: "erreur de supression." });
  });
};
