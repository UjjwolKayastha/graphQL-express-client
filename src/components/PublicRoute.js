import React, { useContext, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const PublicRoute = ({ ...rest }) => {
  const { state } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (state.user) {
      history.push("/profile");
    }
  }, [state.user]);

  // return <Route {...props} />;
  return (
    <div className="container-fluid pt-5">
      <Route {...rest} />
    </div>
  );
};
