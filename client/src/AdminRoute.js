import React from "react";
import { Route, Switch } from "react-router-dom";

import DashboardMain from "./admin/dashboard";
import EditPaiement from "./admin/paiements/EditPaiement";
import ListPaiements from "./admin/paiements/ListPaiements";
import ListUsers from "./admin/users/ListUsers";
import SignupForm from "../src/admin/auth/SignupForm";
import ListProfile from "./admin/profile/ListProfile";
import ForgotPassword from "./admin/auth/ForgotPassword";
import Login from "./admin/auth/Login";
import AddUserView from "./admin/users/AddUserView";
import PrivateRoute from "./PrivateRoute";
import EditProfile from "./admin/profile/EditProfile";

// import IdeasList from "./Admin/ideas/IdeasList";
// import MeetingForm from "./Admin/meeting";
// import Meeting from "./Admin/meeting";
// import MeetingView from "./Admin/meeting/components/MeetingView";

const AdminRoute = () => {
  // useEffect(() => {
  //   console.log(isConnect);
  // }, []);

  return (
    <div>
      {localStorage.getItem("id") ? (
        <Switch>
          <PrivateRoute path="/admin/adduser" component={AddUserView} />
          <PrivateRoute path="/admin/profil" component={ListProfile} />
          <PrivateRoute path="/admin/editprofile" component={EditProfile} />
          <PrivateRoute path="/admin/paiement" component={ListPaiements} />
          <PrivateRoute path="/admin/editpaiement" component={EditPaiement} />
          <PrivateRoute path="/admin/listusers" component={ListUsers} />
          {/* <PrivateRoute path="/admin/meetingedit" component={MeetingForm} /> */}
          {/* <PrivateRoute path="/admin/meetingview" component={MeetingView /> */}
          {/* <PrivateRoute path="/admin/meetingadd" component={Meeting} /> */}
          {/* <PrivateRoute path="/admin/ideaslist" component={IdeasList} /> */}
          <PrivateRoute exact path="/admin" component={DashboardMain} />
        </Switch>
      ) : (
        <Switch>
          <Route exact component={Login} path="/login" />
          <Route exact component={SignupForm} path="/signup/:token" />
          <Route exact component={ForgotPassword} path="/forgotpassword" />
        </Switch>
      )}
    </div>
  );
};

export default AdminRoute;
