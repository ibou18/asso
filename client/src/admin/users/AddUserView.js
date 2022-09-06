import React from "react";
import FormAddUser from './FormAddUser'
// import MeetingForm from "./components/MeetingForm";

import {
  NavBarAdmin,
  HeaderAdmin,
  SideBarAdmin,
  FooterAdmin,
} from "../layout/";

const AddUserView = ({ name, description, picto }) => {
  return (
    <div className="nav-fixed">
      <NavBarAdmin />
      <div id="layoutSidenav">
        <div id="layoutSidenav_content">
          <SideBarAdmin />
          <main>
            <HeaderAdmin
              picto={<i data-feather="grid"></i>}
              name={" Invité un adhérent "}
              description={"Ajout d'un nouvel Adhérent"}
            />
            {/*<!-- Add User--> */}
            <div className="container-xl px-4 mt-n10">
              <FormAddUser />
            </div>
          </main>

          <FooterAdmin />
        </div>
      </div>

      <sb-customizer project="sb-admin-pro"></sb-customizer>
    </div>
  );
};

export default AddUserView;
