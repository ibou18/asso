import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const FormAddUser = (props) => {
  let history = useHistory();
  const [mail, setMail] = useState("");

  const handleChange = (e) => {
    setMail(e.target.value);

    console.log("click");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(props.match);

    const id = localStorage.getItem("id");

    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/user/createaccount/${id}`, {
        mail,
      })
      .then((res) => {
        console.log(res);
        setMail("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <div className="container-xl px-4">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header justify-content-center">
                <h3 className="fw-warning my-4">Invité un adhérent</h3>
              </div>
              <div className="card-body ">
                <form className="justify-content-center" onSubmit={onSubmit}>
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
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className=" mt-3">
                    <button
                      className="btn btn-success col-12"
                      onClick={onSubmit}
                    >
                      Envoyé invitation
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FormAddUser;
