import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Sider from "./Sider";
import Redirect from "./Redirect";
export const PrivateRoute = ({ path, component, ...rest }) => {
  const { state } = useContext(AuthContext);

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
  } else {
    return <Redirect path="/login" />;
  }
};
