import React, { useEffect, useState } from "react";
import moment from "moment";
import { getAllUsers } from "../../api/usersApi";
import Loader from "../../shared/Loader";
import { getAllMeeting } from "../../api/meetingApi";

const ListMeetings = () => {
  const [users, setUsers] = useState();
  const [meetings, setMeetings] = useState();

  const getUsers = async () => {
    await getAllUsers().then((res) => {
      setUsers(res.data);
      console.log("res", res.data);
    });
  };
  const getMeetings = async () => {
    await getAllMeeting().then((res) => {
      setMeetings(res.data);
      console.log("res", res.data);
    });
  };

  useEffect(() => {
    getUsers();
    getMeetings();
  }, []);

  return (
    <div className="card mb-4">
      <div className="card-header">Listes des Réunions</div>
      <div className="card-body">
        <table className="table table-sm table-hover" id="datatablesSimple">
          <thead>
            <tr>
              <th>Date Réunion</th>
              <th>Participant</th>
              <th>Date Prochain</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {meetings ? (
              meetings?.map((meeting) => (
                <>
                  <tr>
                    <td>{moment(meeting.date).format("DD-MM-YYYY")}</td>
                    <td>{meeting.participants.length}</td>
                    <td>
                      {meeting.nextMeeting === ""
                        ? "Date manquante"
                        : moment(meeting.nextMeeting).format("DD-MM-YYYY")}
                    </td>

                    <td>
                      <button className="btn btn-datatable btn-icon btn-transparent-dark me-2">
                        <i data-feather="more-vertical"></i>
                      </button>
                      <button className="btn btn-datatable btn-icon btn-transparent-dark">
                        <i data-feather="trash-2"></i>
                      </button>
                    </td>
                  </tr>
                </>
              ))
            ) : (
              <Loader />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListMeetings;
