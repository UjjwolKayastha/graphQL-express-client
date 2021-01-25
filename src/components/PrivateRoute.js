import React, { useState, useContext, useEffect } from "react";
import { Link, Route,useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Sider from "./Sider";
export const PrivateRoute = ({ path, component, ...rest }) => {
  const history = useHistory();

  const { state } = useContext(AuthContext);

  console.log("STATE", state);

  // return <Route {...props} />;
  const renderContent = () => (
    <div className="container-fluid pt-5">
      <div className="row">
        <div className="col-md-3">{Sider()}</div>
        <div className="col-md-9">
          <Route path={path} component={component} {...rest} />
        </div>
      </div>
    </div>
  );
  
  if (state.user) {
    return renderContent();
  }
  else {
    history.push('/login');
    return <h4>Loading...</h4>;
  }
};
