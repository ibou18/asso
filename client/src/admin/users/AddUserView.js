import React from "react";
import FormAddUser from "./FormAddUser";
// import MeetingForm from "./components/MeetingForm";

const AddUserView = ({ name, description, picto }) => {
  return (
    <div className="container-xl px-4 mt-n10">
      <FormAddUser />
    </div>
  );
};

export default AddUserView;
