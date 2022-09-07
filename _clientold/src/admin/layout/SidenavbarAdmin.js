import React from "react";

import { Link } from "react-router-dom";

const SidenavbarAdmin = () => (
  <div>
    <div id="layoutSidenav_nav">
      <nav className="sidenav shadow-right sidenav-light">
        <div className="sidenav-menu">
          <div className="nav accordion" id="accordionSidenav">
            {/* <!-- Sidenav Menu Heading (Core)--> */}
            <div className="sidenav-menu-heading">Version 0.0.1</div>

            {/* <!-- Sidenav Accordion (Dashboard)--> */}
            <Link
              className="nav-link "
              to="/admin"
              data-bs-target="#collapseDashboards"
              aria-expanded="false"
              aria-controls="collapseDashboards"
            >
              <div className="nav-link-icon">
                <i data-feather="activity"></i>
              </div>
              Dashboard
              <div className="sidenav-collapse-arrow">
                {/* <i className="fas fa-angle-down"></i> */}
              </div>
            </Link>
            <div
              className="collapse"
              id="collapseDashboards"
              data-bs-parent="#accordionSidenav"
            ></div>

            <Link
              className="nav-link collapsed"
              to="javascript:void(0);"
              data-bs-toggle="collapse"
              data-bs-target="#pagesCollapseAccount"
              aria-expanded="false"
              aria-controls="pagesCollapseAccount"
            >
              <div className="nav-link-icon">
                <i data-feather="user"></i>
              </div>
              Adhérent
              <div className="sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </Link>
            <div
              className="collapse"
              id="pagesCollapseAccount"
              data-bs-parent="#accordionSidenavPagesMenu"
            >
              <nav className="sidenav-menu-nested nav">
                <Link className="nav-link" to="/admin/profil">
                  Mon profil
                </Link>
                <Link className="nav-link" to="/admin/editprofile">
                  Modification Profil
                </Link>
                <Link className="nav-link" to="/admin/listusers">
                  Lise des adhérents
                </Link>
                <Link className="nav-link" to="/admin/adduser">
                  Ajouter Adhérent
                </Link>
              </nav>
            </div>
            {/* <Link
              className="nav-link collapsed"
              to="javascript:void(0);"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFlows"
              aria-expanded="false"
              aria-controls="collapseFlows"
            >
              <div className="nav-link-icon">
                <i data-feather="folder"></i>
              </div>
              Réunion
              <div className="sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </Link> */}
            {/* <div
              className="collapse"
              id="collapseFlows"
              data-bs-parent="#accordionSidenav"
            >
              <nav className="sidenav-menu-nested nav">
                <Link className="nav-link" to="/admin/meetingedit">
                  Nouvelle Réunion
                </Link>
                <Link className="nav-link" to="/admin/meetinglist">
                  Liste des réunions
                  <div className="sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </Link>
              </nav>
            </div> */}

            <Link
              className="nav-link collapsed"
              to="javascript:void(0);"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePages"
              aria-expanded="false"
              aria-controls="collapsePages"
            >
              <div className="nav-link-icon">
                <i data-feather="grid"></i>
              </div>
              Réunion
              <div className="sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </Link>
            <div
              className="collapse"
              id="collapsePages"
              data-bs-parent="#accordionSidenav"
            >
              <nav
                className="sidenav-menu-nested nav accordion"
                id="accordionSidenavPagesMenu"
              >
                {/* <!-- Nested Sidenav Accordion (Pages -> Authentication)--> */}
                <Link
                  className="nav-link collapsed"
                  to="/admin/meetingview"
                  aria-expanded="false"
                  aria-controls="pagesCollapseAuthBasic"
                >
                  Liste des Réunions
                </Link>
                <Link
                  className="nav-link collapsed"
                  to="/admin/meetingadd"
                  aria-expanded="false"
                  aria-controls="pagesCollapseAuthBasic"
                >
                  Ajout Réunion
                </Link>
                <div
                  className="collapse"
                  id="pagesCollapseMeeting"
                  data-bs-parent="#accordionSidenavPagesMenu"
                >
                  <nav
                    className="sidenav-menu-nested nav accordion"
                    id="accordionSidenavPagesmeeting"
                  ></nav>
                </div>
              </nav>
            </div>

            {/* <!-- Sidenav Accordion (Paiement)--> */}
            <Link
              className="nav-link collapsed"
              // to="javascript:void(0);"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePagesPaiement"
              aria-expanded="false"
              aria-controls="collapsePages"
            >
              <div className="nav-link-icon">
                <i data-feather="dollar-sign"></i>
              </div>
              Paiement
              <div className="sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </Link>
            <div
              className="collapse"
              id="collapsePagesPaiement"
              data-bs-parent="#accordionSidenav"
            >
              <nav
                className="sidenav-menu-nested nav accordion"
                id="accordionSidenavPagesMenu"
              >
                <Link className="nav-link collapsed" to="/admin/paiement">
                  Liste des paiements
                </Link>

                <Link className="nav-link collapsed" to="/admin/editpaiement">
                  Edit Paiement
                  <div className="sidenav-collapse-arrow"></div>
                </Link>
              </nav>
            </div>

            <Link
              className="nav-link collapsed"
              // to="javascript:void(0);"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePagesIdeas"
              aria-expanded="false"
              aria-controls="collapsePages"
            >
              <div className="nav-link-icon">
                <i data-feather="book"></i>
              </div>
              Idées
              <div className="sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </Link>
            <div
              className="collapse"
              id="collapsePagesIdeas"
              data-bs-parent="#accordionSidenav"
            >
              <nav
                className="sidenav-menu-nested nav accordion"
                id="accordionSidenavPagesMenu"
              >
                <Link className="nav-link collapsed" to="/admin/ideaslist">
                  Liste des Idées
                </Link>

                <Link className="nav-link collapsed" to="/admin/ideaedit">
                  Nouvelle Idée
                  <div className="sidenav-collapse-arrow"></div>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
);

export default SidenavbarAdmin;
