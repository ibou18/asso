import React from "react";
import { Link } from "react-router-dom";

const FooterAdmin = () => {
  return (
    <footer className="footer-admin mt-auto footer-light">
      <div className="container-xl px-4">
        <div className="row">
          <div className="col-md-6 small">Copyright © Your Website 2021</div>
          <div className="col-md-6 text-md-end small">
            <Link to="dashboard-1.html#!">Privacy Policy</Link>·
            <Link to="dashboard-1.html#!">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterAdmin;
