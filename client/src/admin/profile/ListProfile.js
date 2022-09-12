import React from "react";
import { NavBarAdmin, HeaderAdmin, SideBarAdmin, FooterAdmin } from "../layout";

import InfoUser from "../users/composants/InfoUser";

// import NavProfile from "./NavProfile";

const ListProfile = ({ name, description, picto }) => {
  return (
    <div className="container-xl px-4 mt-10">
      <hr className="mt-0 mb-4" />
      <InfoUser />
    </div>
  );
};

export default ListProfile;
