import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const SignupForm = (props) => {
  let history = useHistory();

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    password: "",
    confirmPassword: "",
    mail: "",
    picture: "",
    isAdmin: "",
    phone: "",
    houseNumber: "",
    nameAdress: "",
    nameCity: "",
    postCode: "",
  });

  const handleChange = (items, values) => {
    setFormData({
      ...formData,
      [items]: values,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(" Props dans signup : ", props.match.params);

    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/api/user/register/${props.match.params.token}`,
      withCredentials: false,
      data: formData,
    })
      .then((res) => {
        console.log(res);
        history.push("/login");
      })
      .catch((err) => console.log(err));
  };

  const activButton =
    formData.password !== formData.confirmPassword ||
    formData.password === "" ? (
      <button
        className="btn btn-primary btn-block disabled"
        to="/admin"
        onClick={onSubmit}
      >
        Create Account
      </button>
    ) : (
      <button
        className="btn btn-primary btn-block"
        to="/admin"
        onClick={onSubmit}
      >
        Créer mon compte d'adhérent
      </button>
    );

  return (
    <main>
      <div className="container-xl px-4">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            {/* <!-- Basic registration form--> */}
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header justify-content-center">
                <h3 className="fw-light my-4">Je crée mon Compte</h3>
              </div>
              <div className="card-body">
                <form>
                  <div className="row gx-3">
                    <div className="col-md-6">
                      {/* <!-- Form Group (first name)--> */}
                      <div className="mb-3">
                        <label className="small mb-1" for="inputFirstName">
                          Prénom
                        </label>
                        <input
                          className="form-control"
                          id="inputFirstName"
                          type="text"
                          placeholder="Enter first name"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleChange("firstName", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      {/* <!-- Form Group (last name)--> */}
                      <div className="mb-3">
                        <label className="small mb-1" for="inputLastName">
                          Nom
                        </label>
                        <input
                          className="form-control"
                          id="inputLastName"
                          type="text"
                          placeholder="Enter last name"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleChange("lastName", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {/* <!-- Form Group (email address)--> */}
                  <div className="row gx-3">
                    {/* <div className="col-md-6">
                      <label className="small mb-1" for="inputEmailAddress">
                        Email
                      </label>
                      <input
                        className="form-control"
                        id="inputEmailAddress"
                        type="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email address"
                        value={formData.mail}
                        onChange={(e) => handleChange("mail", e.target.value)}
                      />
                    </div> */}
                    <div className="col-md-6">
                      {/* <!-- Form Group (Téléphone)--> */}

                      <label className="small mb-1" for="inputphone">
                        Téléphone
                      </label>
                      <input
                        className="form-control"
                        id="inputPhone"
                        type="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      {/* <!-- Form Group (Téléphone)--> */}

                      <label className="small mb-1" for="mail">
                        Mail
                      </label>
                      <input
                        className="form-control"
                        id="inputMail"
                        type="mail"
                        value={formData.mail}
                        onChange={(e) => handleChange("mail", e.target.value)}

                        // readOnly
                      />
                    </div>
                  </div>
                  {/* <!-- Form Row    --> */}
                  <div className="row gx-3 mt-3">
                    <div className="col-3">
                      {/* <!-- Form Group (Numéro de rue)--> */}
                      <label className="small mb-1" for="inputhouseNumber">
                        Rue
                      </label>
                      <input
                        className="form-control"
                        id="houseNumber"
                        type="text"
                        placeholder="123"
                        value={formData.houseNumber}
                        onChange={(e) =>
                          handleChange("houseNumber", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-9">
                      {/* <!-- Form Group (adresse)--> */}
                      <div className="mb-3">
                        <label className="small mb-1" for="inputnameAdress">
                          Adresse
                        </label>
                        <input
                          className="form-control"
                          id="nameAdress"
                          type="text"
                          placeholder="rue de Paris"
                          value={formData.nameAdress}
                          onChange={(e) =>
                            handleChange("nameAdress", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row gx-3">
                    <div className="col-4">
                      {/* <!-- Form Group (code postal)--> */}
                      <div className="mb-2">
                        <label className="small mb-1" for="inputpostCode">
                          Code Postal
                        </label>
                        <input
                          className="form-control"
                          id="postCode"
                          type="text"
                          placeholder="75001"
                          value={formData.postCode}
                          onChange={(e) =>
                            handleChange("postCode", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-8">
                      {/* <!-- Form Group (code postal)--> */}
                      <div className="mb-2">
                        <label className="small mb-1" for="nameCity">
                          Ville
                        </label>
                        <input
                          className="form-control"
                          id="nameCity"
                          type="text"
                          placeholder="Lyon"
                          value={formData.nameCity}
                          onChange={(e) =>
                            handleChange("nameCity", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row gx-3">
                    <div className="col-md-6">
                      {/* <!-- Form Group (password)--> */}
                      <div className="mb-3">
                        <label className="small mb-1" for="inputPassword">
                          Mot de passe
                        </label>
                        <input
                          className="form-control"
                          id="inputPassword"
                          type="password"
                          placeholder="Enter password"
                          value={formData.password}
                          onChange={(e) =>
                            handleChange("password", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      {/* <!-- Form Group (confirm password)--> */}
                      <div className="mb-3">
                        <label
                          className="small mb-1"
                          for="inputConfirmPassword"
                        >
                          Confirmer Mot de Passe
                        </label>
                        <input
                          className="form-control"
                          id="inputConfirmPassword"
                          type="password"
                          placeholder="repéter mot de passe"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            handleChange("confirmPassword", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {/* <!-- Form Group (create account submit)--> */}
                  {activButton}
                </form>
              </div>
              <div className="card-footer text-center">
                <div className="small">
                  <Link to="/login">
                    Vous avez déja un compte ? Se connecter ici
                  </Link>
                  {/* {verifPassword} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignupForm;
