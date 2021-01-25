import React, { useState, useContext, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Sider from "./Sider";

export const PrivateRoute = ({ rest }) => {
  const { state } = useContext(AuthContext);

  const { user } = state;
  console.log("STATE", state);

  if (!user) {
    return <h4>Loading...</h4>;
  }

  // return <Route {...props} />;
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

  // if (user) {
  return renderContent();
  // }
};
