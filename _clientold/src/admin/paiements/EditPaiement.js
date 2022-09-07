import React from "react";

import {
  NavBarAdmin,
  HeaderAdmin,
  SideBarAdmin,
  FooterAdmin,
} from "../layout/";


import FormPaiement from "./FormPaiement";


const EditPaiement = ({ name, description }) => {
  return (
    <div className="nav-fixed">
      <NavBarAdmin />
      <div id="layoutSidenav">
        <div id="layoutSidenav_content">
          <SideBarAdmin />
          <main>
            <HeaderAdmin
              name={"Saisie des Paiements"}
              description={"Saisir les paiements"}
            />
            {/*<!-- Main page content--> */}
            <div className="container-xl px-4 mt-n10">
              <div className="containber mt-1">
                <FormPaiement />
              </div>
            </div>
          </main>
          <FooterAdmin />
        </div>
      </div>
      <sb-customizer project="sb-admin-pro"></sb-customizer>
    </div>
  );
};

export default EditPaiement;
