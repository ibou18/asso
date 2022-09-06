const postIdeaModel = require("../models/postIdeaModel");
const UserModel = require("../models/userModel");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllPostIdea = (req, res) => {
  postIdeaModel
    .find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get data : " + err);
    })
    .sort({ createdAt: -1 });
};

module.exports.createPostIdea = async (req, res) => {
  const newPost = new postIdeaModel({
    user: req.body.posterId,
    message: req.body.message,
    comments: [],
  });
  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updatePostIdea = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);
  const updatedRecord = {
    message: req.body.message,
  };
  postIdeaModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updatedRecord },
    { upsert: true, new: true, useFindAndModify: false },
    (err, docs) => {
      if (!err) res.send(docs);
      else res.status(400).json({ message: "Erreur de modification." });
    }
  );
};

module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);
  postIdeaModel.findOneAndRemove({ _id: req.params.id }, (err, docs) => {
    if (!err) res.status(200).json({ message: "post supprimé avec succes." });
    else res.status(400).json({ message: "erreur de supression." });
  });
};

module.exports.commentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);
  if (!ObjectID.isValid(req.body.commenterId))
    return res.status(400).send("ID inconnu : " + req.body.commenterId);
  try {
    return await postIdeaModel
      .findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            comments: {
              commenterId: req.body.commenterId,
              commenterName: req.body.commenterName,
              text: req.body.text,
              timestamp: new Date().getTime(),
            },
          },
        },
        { new: true, upsert: true }
      )
      .exec((err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.editCommentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnue : " + req.params.id);

  try {
    return await postIdeaModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment)
        return res.status(404).send("Ce commentaire n'existe pas");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  try {
    return postIdeaModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
