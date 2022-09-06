import React from "react";
import { NavBarAdmin, HeaderAdmin, SideBarAdmin, FooterAdmin } from "../layout";

import InfoUser from "../users/composants/InfoUser";

// import NavProfile from "./NavProfile";

const ListProfile = ({ name, description, picto }) => {
  return (
    <div className="nav-fixed">
      <NavBarAdmin />
      <div id="layoutSidenav">
        <div id="layoutSidenav_content">
          <SideBarAdmin />
          <main>
            <HeaderAdmin
              picto={<i data-feather="user"></i>}
              name={"Mon Profil "}
              description={"Mes informations personnelles"}
            />
            {/*<!-- Main page content--> */}
            <div className="container-xl px-4 mt-n10">
              <hr class="mt-0 mb-4" />
              <InfoUser />
            </div>
          </main>
          <FooterAdmin />
        </div>
      </div>

      <sb-customizer project="sb-admin-pro"></sb-customizer>
    </div>
  );
};

export default ListProfile;
