import React, { useEffect, useState } from "react";
import axios from "axios";
import { createMeeting } from "../../api/meetingApi";
import Loader from "../../shared/Loader";
import { useHistory } from "react-router-dom";

const AddMeeting = (props) => {
  let history = useHistory();

  let part = [];
  const [form, setForm] = useState({
    by: "",
    report: "",
    objective: "",
    participants: {},
    startAt: "",
    endAt: "",
    nextMeeting: "",
  });

  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [listUser, setListUser] = useState();

  // 1-import List Adhérent
  const getUserList = async () => {
    await axios({
      url: `${process.env.REACT_APP_API_URL}/api/user/users`,
      method: "GET",
      withCredentials: true,
    })
      .then((response) => {
        console.log("response", response);
        setListUser(response.data);
      })
      .catch((err) => console.log("err", err));
  };

  const addMeeting = async (e) => {
    await createMeeting(form);
    setLoading(true);
    setForm({
      by: "",
      report: "",
      objective: "",
      participants: {},
      startAt: "",
      endAt: "",
      nextMeeting: "",
    });

    setTimeout(() => {
      setLoading(false);
      history.push("/admin/meetingview");
    }, 2000);
  };

  const handleChange = (index, value) => {
    setForm({
      ...form,
      [index]: value,
    });
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div className="mt-5 rounded bg-white p-3">
      <form>
        <div className="mb-3">
          <label for="exampleFormControlInput1">Secrétaire de la réunion</label>

          <select
            className="form-control form-control-solid p-2"
            id="exampleFormControlSelect1"
            onChange={(e) => {
              handleChange("by", e.target.value);
            }}
          >
            {listUser &&
              listUser.map((user) => <option>{user?.firstName}</option>)}
          </select>
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1">Objectif de la réunion</label>
          <input
            className="form-control form-control-solid"
            id="exampleFormControlInput1"
            type="text"
            placeholder="Réunion pour la période de ...."
            onChange={(e) => {
              handleChange("objective", e.target.value);
            }}
          />
        </div>

        <div className="mb-3 ">
          <label for="exampleFormControlInput1">
            Période concernant la réunion
          </label>
          <div className="row mt-2">
            <div className="col">
              <label> Date de début</label>
              <input
                className="form-control form-control-solid col-5 "
                id="exampleFormControlInput1"
                type="date"
                placeholder="Réunion pour la période de ...."
                onChange={(e) => {
                  handleChange("startAt", e.target.value);
                }}
              />
            </div>
            <div className="col">
              <label> Date de fin</label>

              <input
                className="form-control form-control-solid col-5"
                id="exampleFormControlInput1"
                type="date"
                placeholder="Réunion pour la période de ...."
                onChange={(e) => {
                  handleChange("endAt", e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div class="form-check">
          {listUser ? (
            listUser.map((list, index) => (
              <div key={index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={list._id}
                  checked={isChecked}
                  id={`flexCheckDefault-${index}`}
                  onChange={(e) => {
                    setIsChecked(!isChecked);
                    part.push(e.target.value);

                    console.log("e", e.target.value);
                    console.log("part", part);
                  }}
                />
                <label class="form-check-label" for="flexCheckDefault">
                  {list.firstName} {list.lastName}
                </label>
              </div>
            ))
          ) : (
            <Loader />
          )}
        </div>

        <div className="mb-0">
          <label for="exampleFormControlTextarea1">Les participants</label>
          <select
            className="form-select"
            multiple
            aria-label="multiple select example"
            onChange={(e) => {
              part.push(e.target.value);
              setForm({
                ...form,
              });
              console.log(e);
              console.log("part", part);
            }}
          >
            <option selected>Open this select menu</option>
            {listUser ? (
              listUser.map((list) => (
                <option value={list._id}>
                  {list.firstName + " " + list.lastName}{" "}
                </option>
              ))
            ) : (
              <Loader />
            )}
          </select>
        </div>

        <div className="mb-0">
          <label for="exampleFormControlTextarea1">
            Compte rendu de la réunion
          </label>
          <textarea
            className="form-control form-control-solid"
            id="exampleFormControlTextarea1"
            rows="10"
            onChange={(e) => {
              handleChange("report", e.target.value);
            }}
          />
        </div>

        <div className="mt-2 ">
          <label> Date de la prochaine réunion</label>

          <input
            className="form-control form-control-solid col-3"
            id="exampleFormControlInput1"
            type="date"
            placeholder="Réunion pour la période de ...."
            onChange={(e) => {
              handleChange("nextMeeting", e.target.value);
            }}
          />
        </div>
      </form>
      {loading ? (
        <Loader />
      ) : (
        <button className="btn btn-success mt-5" onClick={() => addMeeting()}>
          Ajouter la réunion
        </button>
      )}
    </div>
  );
};

export default AddMeeting;
