import React, { useState, useContext, useEffect } from "react";
import { Link, Route, useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Sider from "./Sider";

export const PrivateRoute = ({ path, component, ...rest }) => {
  const { state } = useContext(AuthContext);

  const [user, setUser] = useState(false);

  useEffect(() => {
    if (state.user) {
      setUser(true);
    }
  }, [state.user]);

  const history = useHistory();

  // return <Route {...props} />;
  const renderContent = () => {
    return (
      <div className="container-fluid pt-5">
        <div className="row">
          <div className="col-md-3">{Sider()}</div>
          <div className="col-md-9">
            <Route
              path={path}
              component={component}
              {...rest}
              // render={(props) => {
              //   return <Component {...props} />;
              // }}
            />
          </div>
        </div>
      </div>
    );
  };

  if (user) {
    return renderContent();
  }

  else {
    history.push("/login");
    return <h4>Loading...</h4>;
  }
};
