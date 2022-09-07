import React from "react";

import {
  NavBarAdmin,
  HeaderAdmin,
  SideBarAdmin,
  FooterAdmin,
} from "../layout/";

// import InfoUserEdit from "./InfoUserEdit";

const EditProfile = ({ picto, name, description }) => {
  return (
    <div className="nav-fixed">
      <NavBarAdmin />
      <div id="layoutSidenav">
        <div id="layoutSidenav_content">
          <SideBarAdmin />
          <main>
            <HeaderAdmin
              picto={<i data-feather="user"></i>}
              name={"Edition du Profil"}
              description={"Modifier vos informations"}
            />
            {/*<!-- Main page content--> */}
            <div className="container-xl px-4 mt-n10">
              {/* <InfoUserEdit /> */}
              {/* <MeetingForm /> */}
            </div>
          </main>

          <FooterAdmin />
        </div>
      </div>

      <sb-customizer project="sb-admin-pro"></sb-customizer>
    </div>
  );
};

export default EditProfile;
