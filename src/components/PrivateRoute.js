import React, { useState, useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Sider from "./Sider";

const PrivateRoute = ({ ...rest }) => {
  const { state } = useContext(AuthContext);
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (state.user) {
      setUser(true);
    }
  }, [state.user]);

  console.log("STATE", state);
  console.log("USER", user);

  const renderContent = () => (
    <div className="container-fluid pt-5">
      <div className="row">
        <div className="col-md-3">{Sider()}</div>
        <div className="col-md-9">
          <Route {...rest} />
        </div>
      </div>
    </div>
  );

  return user ? renderContent() : <h4>Loading...</h4>;
};

export default PrivateRoute;
