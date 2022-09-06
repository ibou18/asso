import React from "react";
import { Route, Switch } from "react-router-dom";

import ResetPassword from "./admin/auth/ResetPassword";
import Accueil from "./static/pages/Accueil";
import About from "./static/pages/About";
import News from "./static/pages/News";
// import ErrorPage from "./Admin/components/error404";

const FrontRoute = () => {
  return (
    <div>
      <Switch>
        <Route component={Accueil} path="/accueil" />
        <Route component={About} path="/about" />
        <Route component={News} path="/news" />
        <Route component={ResetPassword} path="/resetpassword/:token" />
        {/* <Route component={ErrorPage} path="*" /> */}
      </Switch>
    </div>
  );
};

export default FrontRoute;
