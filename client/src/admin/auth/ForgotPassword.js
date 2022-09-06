import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword(props) {
  const [mail, setMail] = useState("");

  const history = useHistory();

  const handleChange = (value) => {
    setMail(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(mail);

    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/user/forgotpassword`, {
        mail,
      })
      .then((res) => {
        console.log("Response : ", res);

        setTimeout(() => {
          history.push("/login");
        }, 2000);
      })
      .catch((err) => console.log(err));

    // console.log(props);
    // props.history.push("/admin");
  };

  return (
    <main>
      <div className="container-xl px-4">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header justify-content-center">
                <h3 className="fw-warning my-4">Mot de passe Oublié </h3>
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
                        value={mail}
                        onChange={(e) => handleChange(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-secondary col-12  mt-5"
                    onClick={onSubmit}
                  >
                    Se connecter
                  </button>
                </form>
              </div>
              <div className="card-footer text-center">
                <div className="small">
                  <Link to="/login"> Se connecter</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
