import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "./authContext";
import api from "./api";

function PrivateRoute({ component: Component, ...rest }) {
  const authContext = useContext(AuthContext);

  const [validToken, setValidToken] = useState(0);
  useEffect(async () => {
    try {
      const response = await api.get(
        `${process.env.REACT_APP_API_BASE}usuario/verifytoken`
      );
    } catch (error) {
      if (error.response.status === 401) {
        setValidToken(401);
      }
      console.error(error);
    }
  }, []);
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (authContext.loggedInUser) {
          if (authContext.loggedInUser.user._id) {
            if (validToken === 0) {
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
