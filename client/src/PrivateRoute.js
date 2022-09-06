import React from "react";
import { Auth } from "./admin/context/AuthContext";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const { isConnect } = Auth();

  return (
    <Route
      exact
      {...rest}
      render={(props) =>
        localStorage.getItem("id") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default PrivateRoute;
