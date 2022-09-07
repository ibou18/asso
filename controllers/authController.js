const UserModel = require("../models/userModel");
const TokenModel = require("../models/tokenModel");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/customeError");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const {
    firstName,
    lastName,
    password,
    phone,
    houseNumber,
    nameAdress,
    nameCity,
    postCode,
  } = req.body;
  let token = await TokenModel.findOne({ token: req.params.token }).exec();
  console.log(req.body);
  try {
    if (token.token == req.params.token) {
      console.log("le Token : ", token);
      let user = await UserModel.create({
        firstName: firstName,
        lastName: lastName,
        email: token.email,
        password: password,
        phone: phone,
        houseNumber: houseNumber,
        nameAdress: nameAdress,
        nameCity: nameCity,
        postCode: postCode,
      });
      await TokenModel.findOneAndRemove({ _id: token._id });
      res.status(201).json({ user: user._id });
    } else {
      return res.status(400).json();
    }
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(401).send(errors);
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    user.password = "";
    res.status(200).json({ user: user, assoc_token: token });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(401).json(errors);
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  // res.redirect("/");
  res.status(201).json("deconnection");
};

exports.createAccount = async (req, res, next) => {
  const { email } = req.body;
  console.log("req", req.body);
  try {
    const resetToken = createToken(req.params.id);
    const resetUrl = `http://localhost:3000/signup/${resetToken}`;
    const message = `
      <h1>Votre lien d'inscription </h1> </br>
      <p> Veuillez trouvez-ci joint lien d'inscription, en cliquant sur le lien une page s'ouvrira pour saisir vos
      coordonnées  : </p> </br>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;
    try {
      await sendEmail({
        to: email,
        subject: "lien pour creer un compte dans l'association",
        text: message,
      });
      await TokenModel.create({ token: resetToken, mail: email });
      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);
      return res.status(500).send("email non envoyer");
    }
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  let user = await UserModel.findOne({ email: email }).exec();
  console.log(user);
  if (!user) {
    res.status(400).send("Le mail n'existe pas");
  }
  try {
    const resetToken = createToken(user?._id);
    const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;
    const message = `
      <h1>Votre lien de modification de votre mot de passe </h1>
      <p> ci dessous votre lien de modification : </p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;
    try {
      await sendEmail({
        to: email,
        subject: "Modification de votre mot de passe",
        text: message,
      });
      await UserModel.findOneAndUpdate(
        { _id: user._id },
        {
          $set: {
            resetPasswordToken: resetToken,
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, docs) => {
          if (err) return res.status(500).send({ message: err });
        }
      );
      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);
      return res.status(500).send("email non envoyer");
    }
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  const { password } = req.body;
  console.log("le token est ", req.params.id);

  if (req.params.id) {
    jwt.verify(
      req.params.id,
      process.env.TOKEN_SECRET,
      async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.send(200).json("Le token n'est pas valide");
        } else {
          console.log(decodedToken.id);
          // vérifie si user existe
          let user = await UserModel.findOne({ _id: decodedToken.id }).exec();
          console.log(user);
          if (!user) {
            res.status(400).send("L'utilisateur n'existe pas");
          }
          // vérification du Token identique a celui dans la base que celui générer pour le user envoyé par mail
          if (user.resetPasswordToken === req.params.id) {
            const salt = await bcrypt.genSalt();
            const passwordCrypt = await bcrypt.hash(password, salt);

            await UserModel.findOneAndUpdate(
              { _id: user._id },
              {
                $set: {
                  resetPasswordToken: "",
                  password: passwordCrypt,
                },
              },
              { new: true, upsert: true, setDefaultsOnInsert: true },
              (err, docs) => {
                if (!err) {
                  return res.status(200).send("Mot de passe Modifier");
                }
                if (err) return res.status(500).send({ message: err });
              }
            );
          }
        }
      }
    );
  } else {
    res.status(403).json("Vous avez pas l'autorisation");
    console.log("Token invalidé");
  }
};
