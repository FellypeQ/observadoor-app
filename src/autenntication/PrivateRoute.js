import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "./authContext";
import api from "./api";

function PrivateRoute({ component: Component, ...rest }) {
  const authContext = useContext(AuthContext);

  const [validToken, setValidToken] = useState(true);

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (authContext.loggedInUser) {
          if (authContext.loggedInUser.user._id) {
            if (validToken) {
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
