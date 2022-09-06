import React from "react";
import { Link } from "react-router-dom";

const CardStatus = () => {
  return (
    <div className="row">
      <div className="col-lg-6 col-xl-3 mb-4">
        <div className="card bg-primary text-white h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div className="me-3">
                <div className="text-white-75">Total dans le compte</div>
                <div className="text-lg fw-bold">3200,00 €</div>
              </div>
              <i
                className="feather-xl text-white"
                data-feather="dollar-sign"
              ></i>
            </div>
          </div>
          <div className="card-footer d-flex align-items-center justify-content-between small">
            <Link
              className="text-white stretched-link disabled"
              to="dashboard-1.html#!"
            >
              Plus d'informations...
            </Link>
            <div className="text-white">
              <i className="fas fa-angle-right"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-xl-3 mb-4">
        <div className="card bg-warning text-white h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div className="me-3">
                <div className="text-white-75 ">Prochaine Réunion</div>
                <div className="text-lg fw-bold">
                  <h1 className="text-white"> 12/07/2021 </h1>
                </div>
              </div>
              <i className="feather-xl text-white" data-feather="calendar"></i>
            </div>
          </div>
          <div className="card-footer d-flex align-items-center justify-content-between small">
            <Link
              className="text-white stretched-link "
              to="dashboard-1.html#!"
            >
              Plus d'informations...
            </Link>
            <div className="text-white">
              <i className="fas fa-angle-right"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-xl-3 mb-4">
        <div className="card bg-success text-white h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div className="me-3">
                <div className="text-white-75 ">Nombre d'Adhérent actif </div>
                <div className="text-lg fw-bold">24</div>
              </div>
              <i
                className="feather-xl text-white"
                data-feather="check-square"
              ></i>
            </div>
          </div>
          <div className="card-footer d-flex align-items-center justify-content-between small">
            <Link className="text-white stretched-link" to="dashboard-1.html#!">
              Plus d'informations...
            </Link>
            <div className="text-white">
              <i className="fas fa-angle-right"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-xl-3 mb-4">
        <div className="card bg-danger text-white h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div className="me-3">
                <div className="text-white-75 ">Idées en cours</div>
                <div className="text-lg fw-bold">17</div>
              </div>
              <i
                className="feather-xl text-white"
                data-feather="message-circle"
              ></i>
            </div>
          </div>
          <div className="card-footer d-flex align-items-center justify-content-between small">
            <Link className="text-white stretched-link" to="dashboard-1.html#!">
              Plus d'informations...
            </Link>
            <div className="text-white">
              <i className="fas fa-angle-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardStatus;
