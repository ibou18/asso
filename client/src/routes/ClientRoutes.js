import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Login, ForgotPassword, ResetPassword } from "../pages/client/";
import Register from "../pages/client/Register";
import HomePage from "../pages/HomePage";

const ClientRoute = () => {
  return (
    <div>
      <Router>
        {/* Navbar here  */}
        <div className="mt-5 ml-10">
          <Switch>
            <Route component={ForgotPassword} path="/forgot-password" />
            <Route component={ResetPassword} path="/reset-password/:token" />
            <Route exact component={Register} path="/signup/:token" />
            <Route exact component={Login} path="/login" />
            <Route exact component={HomePage} path="/" />
            <Route exact component={HomePage} path="*" />
          </Switch>
        </div>
        {/* Footer here  */}
      </Router>
    </div>
  );
};

export default ClientRoute;
