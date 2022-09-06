import React from "react";
import FormPaiement from "./FormPaiement";


import {
  NavBarAdmin,
  HeaderAdmin,
  SideBarAdmin,
  FooterAdmin,
} from "../layout/";

const ListPaiements = () => {
  return (
    <div className="nav-fixed">
      <NavBarAdmin />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <SideBarAdmin />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <HeaderAdmin
              name={"Liste des Paiements"}
              description={"Voir tous les paiements "}
            />
            {/*<!-- Main page content--> */}
            <div className="container-xl px-4 mt-n10">
              <div className="container mt-1">
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

export default ListPaiements;
