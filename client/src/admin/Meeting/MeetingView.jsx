import React from "react";
import { useHistory } from "react-router-dom";
import { NavBarAdmin, HeaderAdmin, SideBarAdmin, FooterAdmin } from "../layout";

import InfoUser from "../users/composants/InfoUser";
import ListMeetings from "./ListMeetings";

// import NavProfile from "./NavProfile";

const MeetingView = ({ name, description, picto }) => {
  let history = useHistory();

  return (
    <div className="container-xl px-4 mt-2">
      <hr className="mt-0 mb-4" />
      <button
        className="btn btn-success m-2"
        onClick={() => history.push("/admin/add-meeting")}
      >
        {" "}
        + Meeting
      </button>
      <ListMeetings />
    </div>
  );
};

export default MeetingView;
