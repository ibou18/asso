import React from "react";
import { Route, Switch } from "react-router-dom";

import DashboardMain from "./admin/dashboard";
import EditPaiement from "./admin/paiements/EditPaiement";
import ListPaiements from "./admin/paiements/ListPaiements";
import ListUsers from "./admin/users/ListUsers";
import SignupForm from "../src/admin/auth/SignupForm";
import ListProfile from "./admin/profile/ListProfile";
import ForgotPassword from "./admin/auth/ForgotPassword";
import ResetPassword from "./admin/auth/ResetPassword";
import Login from "./admin/auth/Login";
import AddUserView from "./admin/users/AddUserView";
import PrivateRoute from "./PrivateRoute";
import EditProfile from "./admin/profile/EditProfile";
import MeetingView from "./admin/Meeting/MeetingView";
import {
  FooterAdmin,
  HeaderAdmin,
  NavBarAdmin,
  SideBarAdmin,
} from "./admin/layout";
import AddMeeting from "./admin/Meeting/AddMeeting";

// import IdeasList from "./Admin/ideas/IdeasList";
// import MeetingForm from "./Admin/meeting";
// import Meeting from "./Admin/meeting";

const AdminRoute = () => {
  // useEffect(() => {
  //   console.log(isConnect);
  // }, []);

  return (
    <div>
      {localStorage.getItem("id") ? (
        <div className="nav-fixed">
          <NavBarAdmin />
          <div id="layoutSidenav">
            <div id="layoutSidenav_content">
              <SideBarAdmin />
              <main>
                <HeaderAdmin
                  picto={<i data-feather="user"></i>}
                  name={"Administration "}
                  description={"connecté en tant que Admin"}
                />
                <Switch>
                  <PrivateRoute path="/admin/adduser" component={AddUserView} />
                  <PrivateRoute path="/admin/profil" component={ListProfile} />
                  <PrivateRoute
                    path="/admin/editprofile"
                    component={EditProfile}
                  />
                  <PrivateRoute
                    path="/admin/paiement"
                    component={ListPaiements}
                  />
                  <PrivateRoute
                    path="/admin/editpaiement"
                    component={EditPaiement}
                  />
                  <PrivateRoute path="/admin/listusers" component={ListUsers} />
                  <PrivateRoute
                    path="/admin/meetingview"
                    component={MeetingView}
                  />
                  <PrivateRoute
                    path="/admin/add-meeting"
                    component={AddMeeting}
                  />
                  {/* <PrivateRoute path="/admin/meetingedit" component={MeetingForm} /> */}
                  {/* <PrivateRoute path="/admin/meetingadd" component={Meeting} /> */}
                  {/* <PrivateRoute path="/admin/ideaslist" component={IdeasList} /> */}
                  <PrivateRoute exact path="/admin" component={DashboardMain} />
                </Switch>
              </main>
              <FooterAdmin />
            </div>
          </div>

          <sb-customizer project="sb-admin-pro"></sb-customizer>
        </div>
      ) : (
        <Switch>
          <Route exact component={Login} path="/login" />
          <Route exact component={SignupForm} path="/signup/:token" />
          <Route exact component={ResetPassword} path="/resetpassword/:token" />
          <Route exact component={ForgotPassword} path="/forgotpassword" />
        </Switch>
      )}
    </div>
  );
};

export default AdminRoute;
