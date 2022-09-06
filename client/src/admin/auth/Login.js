// import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// import du context concernant l'authentification
import { Auth } from "../context/AuthContext";

export default function Login(props) {
  // Récupérer la fonction Login dans le Auth
  const { login, isConnect, setUser, user } = Auth();

  const [isLogged, setIsLogged] = useState(false);
  let history = useHistory();

  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });

  const handleChange = (items, values) => {
    setFormData({
      ...formData,
      [items]: values,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let test = await login(formData);
    await setUser(test);
    console.log("test : ", test);
    console.log("iscon", isConnect);
    console.log("user", user);

    setIsLogged(true);
    setTimeout(() => {
      history.push("/admin");
    }, 3000);

    // if (localStorage.getItem("id")) {
    //   console.log(props);
    // }
  };

  const btnSubmit = !isLogged ? (
    <button className="btn btn-secondary col-12" onClick={onSubmit}>
      Se connecter
    </button>
  ) : (
    <button class="btn btn-success col-12" type="button" disabled>
      <span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      <span class="visually-hidden">Loading...</span>
    </button>
  );

  return (
    <main>
      <div className="container-xl px-4">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header justify-content-center">
                <h3 className="fw-warning my-4">Se Connecter</h3>
              </div>
              <div className="card-body ">
                <form className="justify-content-center">
                  <div className="row gx-2">
                    <div className="col-12 ">
                      <label className="mb-1" for="inputEmailAddress">
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
                    </div>
                    <div className="col-12 pt-2 ">
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
                    {btnSubmit}
                  </div>
                </form>
              </div>
              <div className="card-footer text-center">
                <div className="small">
                  <Link to="/forgotpassword">Mot de passe oublié ? </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
