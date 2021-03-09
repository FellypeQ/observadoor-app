import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "./authContext";

function PrivateRoute({ component: Component, ...rest }) {
  const authContext = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (authContext.loggedInUser) {
          if (authContext.loggedInUser.user._id) {
            return <Component {...routeProps} {...rest} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: routeProps.location },
                }}
              />
            );
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: routeProps.location },
              }}
            />
          );
        }
      }}
    />
  );
}

export default PrivateRoute;
