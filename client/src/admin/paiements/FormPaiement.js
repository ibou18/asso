import React from "react";

const FormPaiement = () => {
  return (
    <div>
      <div className="card mb-4">
        <div className="card-header">Personnel Management</div>
        <div className="card-body">
          <table className="table table-hover" id="datatablesSimple">
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Prénom</th>
                <th>Téléphone</th>
                <th>Mail</th>
                <th>Ville</th>
                <th>Q1</th>
                <th>Q2</th>
                <th>Q3</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>001</td>
                <td>Ibrahima</td>
                <td>Diallo</td>
                <td>514.222.6801</td>
                <td>ibdiallo.ca@gmail.com</td>
                <td>Laval,QC</td>
                <td>30,00€</td>
                <td>30,00€</td>
                <td>00,00€</td>
                <td>
                  <div className="badge bg-warning text-white rounded-pill">
                    A jour
                  </div>
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
              <tr>
                <td>001</td>
                <td>Ibrahima</td>
                <td>Diallo</td>
                <td>514.222.6801</td>
                <td>ibdiallo.ca@gmail.com</td>
                <td>Laval,QC</td>
                <td>30,00€</td>
                <td>00,00€</td>
                <td>00,00€</td>
                <td>
                  <div className="badge bg-danger text-white rounded-pill">
                    A jour
                  </div>
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
              <tr>
                <td>001</td>
                <td>Ibrahima</td>
                <td>Diallo</td>
                <td>514.222.6801</td>
                <td>ibdiallo.ca@gmail.com</td>
                <td>Laval,QC</td>
                <td>30,00€</td>
                <td>30,00€</td>
                <td>30,00€</td>
                <td>
                  <div className="badge bg-success text-white rounded-pill">
                    A jour
                  </div>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FormPaiement;
