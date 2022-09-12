import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const FooterAdmin = () => {
  return (
    <footer className="footer-admin mt-auto footer-light">
      <div className="container-xl px-4">
        <div className="row">
          <div className="col-md-12 text-center small">
            Copyright ©Laguidev {moment(Date.now()).format("YYYY")} Laval, 🍁
            Montréal Canada 🇨🇦
          </div>
          <div className="col-md-12 text-md-center small">
            <Link to="dashboard-1.html#!">Privacy Policy</Link>·
            <Link to="dashboard-1.html#!">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterAdmin;
