module.exports.signUpErrors = (err) => {
  let errors = { mail: "", password: "" };

  if (err.message.includes("mail")) errors.mail = "Email incorrect";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractères minimum";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.mail = "Cet email est déjà enregistré";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { mail: "", password: "" };

  if (err.message.includes("email")) errors.mail = "Email inconnu";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe ne correspond pas";

  return errors;
};
