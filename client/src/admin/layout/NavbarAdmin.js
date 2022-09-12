/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Auth } from "../../admin/context/AuthContext";

import { Link, useHistory } from "react-router-dom";

const NavBarAdmin = (props) => {
  let history = useHistory();
  const { user } = Auth();

  const logout = async () => {
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/api/user/logout`,
      // withCredentials: true,
    });

    localStorage.removeItem("id");
    window.location.replace("/login");
  };

  const test = () => {
    console.log("user dans Navbar test : ", user);
  };

  return (
    <nav
      className="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-light"
      id="sidenavAccordion"
    >
      {/*<!-- Sidenav Toggle Button--> */}
      <button
        className="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0"
        id="sidebarToggle"
      >
        <i data-feather="menu"></i>
      </button>
      {/*<!-- Navbar Brand--> */}
      <Link className="navbar-brand pe-3 ps-4 ps-lg-2" to="/admin">
        AFGT Panel
      </Link>

      {/*<!-- Navbar Items--> */}
      <ul className="navbar-nav align-items-center ms-auto">
        {/*<!-- Documentation Dropdown--> */}
        <li className="nav-item dropdown no-caret d-none d-md-block me-3">
          <div
            className="dropdown-menu dropdown-menu-end py-0 me-sm-n15 me-lg-0 o-hidden animated--fade-in-up"
            aria-labelledby="navbarDropdownDocs"
          >
            <div className="dropdown-divider m-0"></div>
            <Link
              className="dropdown-item py-3"
              to="https://docs.startbootstrap.com/sb-admin-pro/changelog"
              target="_blank"
            >
              <div className="icon-stack bg-primary-soft text-primary me-4">
                <i data-feather="file-text"></i>
              </div>
              <div>
                <div className="small text-gray-500">Changelog</div>
                Updates and changes
              </div>
            </Link>
          </div>
        </li>
        {/*<!-- Navbar Search Dropdown--> */}
        {/*<!-- * * Note: * * Visible only below the lg breakpoint--> */}
        <li className="nav-item dropdown no-caret me-3 d-lg-none">
          <Link
            className="btn btn-icon btn-transparent-dark dropdown-toggle"
            id="searchDropdown"
            to="dashboard-1.html#"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i data-feather="search"></i>
          </Link>
          {/*<!-- Dropdown - Search--> */}
          <div
            className="dropdown-menu dropdown-menu-end p-3 shadow animated--fade-in-up"
            aria-labelledby="searchDropdown"
          >
            <form className="form-inline me-auto w-100">
              <div className="input-group input-group-joined input-group-solid">
                <input
                  className="form-control pe-0"
                  type="text"
                  placeholder="Search for..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-text">
                  <i data-feather="search"></i>
                </div>
              </div>
            </form>
          </div>
        </li>
        {/*<!-- Alerts Dropdown--> */}

        {/*<!-- Messages Dropdown--> */}
        <li className="nav-item dropdown no-caret d-none d-sm-block me-3 dropdown-notifications ">
          <Link
            className="btn btn-icon btn-transparent-dark dropdown-toggle"
            id="navbarDropdownMessages"
            to="javascript:void(0);"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i data-feather="mail"></i>
          </Link>
          <div
            className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up"
            aria-labelledby="navbarDropdownMessages"
          >
            <h6 className="dropdown-header dropdown-notifications-header">
              <i className="me-2" data-feather="mail"></i>
              Message Center
            </h6>
            {/*<!-- Example Message 1  --> */}
            <Link
              className="dropdown-item dropdown-notifications-item"
              to="dashboard-1.html#!"
            >
              <img
                className="dropdown-notifications-item-img"
                src="/assets/img/illustrations/profiles/profile-2.png"
              />
              <div className="dropdown-notifications-item-content">
                <div className="dropdown-notifications-item-content-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </div>
                <div className="dropdown-notifications-item-content-details">
                  Thomas Wilcox · 58m
                </div>
              </div>
            </Link>
            {/*<!-- Example Message 2--> */}
            <Link
              className="dropdown-item dropdown-notifications-item"
              to="dashboard-1.html#!"
            >
              <img
                className="dropdown-notifications-item-img"
                src="/assets/img/illustrations/profiles/profile-3.png"
              />
              <div className="dropdown-notifications-item-content">
                <div className="dropdown-notifications-item-content-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </div>
                <div className="dropdown-notifications-item-content-details">
                  Emily Fowler · 2d
                </div>
              </div>
            </Link>
            {/*<!-- Example Message 3--> */}
            <Link
              className="dropdown-item dropdown-notifications-item"
              to="dashboard-1.html#!"
            >
              <img
                className="dropdown-notifications-item-img"
                src="/assets/img/illustrations/profiles/profile-4.png"
              />
              <div className="dropdown-notifications-item-content">
                <div className="dropdown-notifications-item-content-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </div>
                <div className="dropdown-notifications-item-content-details">
                  Marshall Rosencrantz · 3d
                </div>
              </div>
            </Link>
            {/*<!-- Example Message 4--> */}
            <Link
              className="dropdown-item dropdown-notifications-item"
              to="dashboard-1.html#!"
            >
              <img
                className="dropdown-notifications-item-img"
                src="/assets/img/illustrations/profiles/profile-5.png"
              />
              <div className="dropdown-notifications-item-content">
                <div className="dropdown-notifications-item-content-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </div>
                <div className="dropdown-notifications-item-content-details">
                  Colby Newton · 3d
                </div>
              </div>
            </Link>
            {/*<!-- Footer Link--> */}
            <Link
              className="dropdown-item dropdown-notifications-footer"
              to="dashboard-1.html#!"
            >
              Read All Messages
            </Link>
          </div>
        </li>
        {/*<!-- User Dropdown--> */}
        <li className="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
          <Link
            className="btn btn-icon btn-transparent-dark dropdown-toggle"
            id="navbarDropdownUserImage"
            to="javascript:void(0);"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              className="img-fluid"
              src="/assets/img/illustrations/profiles/profile-2.png"
            />
          </Link>
          <div
            className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up"
            aria-labelledby="navbarDropdownUserImage"
          >
            <h6 className="dropdown-header d-flex align-items-center">
              <img
                className="dropdown-user-img"
                src="/assets/img/illustrations/profiles/profile-2.png"
              />
              <div className="dropdown-user-details">
                <div className="dropdown-user-details-name">
                  {user.firstName}
                </div>
                <div className="dropdown-user-details-email">
                  {/* <Link
                    to="cdn-cgi/l/email-protection.html"
                    className="__cf_email__"
                    data-cfemail="7e08120b101f3e1f1112501d1113"
                  >
                    [email&#160;protected]
                  </Link> */}
                </div>
              </div>
            </h6>
            <div className="dropdown-divider"></div>
            <button
              className="dropdown-item"
              /* to="/admin/profil" */ onClick={test}
            >
              <div className="dropdown-item-icon">
                <i data-feather="settings"></i>
              </div>
              Account
            </button>
            <button className="dropdown-item" onClick={logout}>
              <div className="dropdown-item-icon">
                <i data-feather="log-out"></i>
              </div>
              Deconnection
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBarAdmin;
