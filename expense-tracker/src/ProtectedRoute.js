import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserName } from "./redux/userSlice";
function ProtectedRoute({ component: Component, ...rest }) {
  const user = useSelector(selectUserName);

  const isAuthenticated = user;

  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          if (isAuthenticated) return <Component {...props} />;
          if (!isAuthenticated)
            return (
              <Redirect to={{ path: "/", state: { from: props.location } }} />
            );
        }}
      />
    </div>
  );
}

export default ProtectedRoute;
