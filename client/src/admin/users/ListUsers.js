import React, { useEffect, useState } from "react";
import Loader from "../../shared/Loader";
import { getAllUsers } from "../../api/usersApi";

const ListUsers = () => {
  const [users, setUsers] = useState();

  const getUsers = async () => {
    await getAllUsers().then((res) => {
      setUsers(res.data);
      console.log("res", res.data);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="card mb-4">
      <div className="card-header">Listes des adhérents</div>
      <div className="card-body">
        <table className="table table-sm table-hover" id="datatablesSimple">
          <thead>
            <tr>
              <th>Adherent</th>
              <th>Ville</th>
              <th>E-mail</th>
              <th>Téléphone</th>
              <th>Détails</th>
            </tr>
          </thead>

          <tbody>
            {users ? (
              users?.map((user) => (
                <>
                  <tr>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.nameCity}</td>
                    <td>{user.mail}</td>
                    <td>{user.phone}</td>

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

export default ListUsers;
