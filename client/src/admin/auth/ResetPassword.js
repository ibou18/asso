import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ResetPassword(props) {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState();

  const handleChange = (items, values) => {
    setFormData({
      ...formData,
      [items]: values,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("mot de passe ne correspond pas");
      setTimeout(() => {
        setErrorMessage("");
        setFormData({
          password: "",
          confirmPassword: "",
        });
      }, 2000);
    }

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}resetpassword/${props.match.params.token}`,
        formData
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log("erreur Reset" + err));

    console.log(props);
  };

  return (
    <main>
      <div className="container-xl px-4">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header justify-content-center">
                <h3 className="fw-warning my-4"> Changez le mot de passe </h3>
              </div>
              <div className="card-body ">
                {errorMessage ? (
                  <p className="lead text-center text-danger">{errorMessage}</p>
                ) : null}
                <form className="justify-content-center">
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
                  <button
                    className="btn btn-secondary col-12"
                    onClick={onSubmit}
                  >
                    Se connecter
                  </button>
                </form>
              </div>
              <div className="card-footer text-center">
                <div className="small">
                  <Link to="/">Pas encore de compte ? faire la demande</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
