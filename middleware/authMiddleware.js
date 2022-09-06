const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

module.exports.verificationToken = async (req, res, next) => {
  const token = req.cookies.jwt ? req.cookies.jwt : req.headers.authorization;
  console.log(req.headers.authorization);
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.status(400).json("pas de  token valide 1");
      } else {
        let user = await UserModel.findById(decodedToken.id).select(
          "-password"
        );
        res.status(200).json(user);
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    return res.send(500).json({ message: "Vous etes pas autorise" });
  }
};
module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt ? req.cookies.jwt : req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json("pas de token");
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    res.status(403).json("Vous n'avez pas l'autorisation");
    console.log("pas de token valide 2");
  }
};
