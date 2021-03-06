import React, { useContext } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CompleteRegistration from "./pages/auth/CompleteRegistration";

import { AuthContext } from "./context/authContext";
import { PrivateRoute } from "./components/PrivateRoute";
import UpdatePassword from "./pages/auth/UpdatePassword";
import Profile from "./pages/auth/Profile";
import Post from "./pages/post/Post";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Error404 from "./pages/Error404";
import { PublicRoute } from "./components/PublicRoute";
import Users from "./pages/Users";

const App = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;

  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_API,
    request: (operation) => {
      operation.setContext({
        headers: {
          authtoken: user ? user.token : "",
        },
      });
    },
  });

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Nav />
        <ToastContainer />
        <Switch>
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/register" component={Register} />
          <Route exact path="/all-users" component={Users} />
          <PublicRoute
            exact
            path="/complete-registration"
            component={CompleteRegistration}
          />
          <PublicRoute
            exact
            path="/password/forgot"
            component={ForgotPassword}
          />
          <PrivateRoute
            exact
            path="/password/update"
            component={UpdatePassword}
          />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/post/create" component={Post} />
          <PrivateRoute exact path="/" component={Home} />
          <Route path="*" component={Error404} />
        </Switch>
      </ApolloProvider>
    </BrowserRouter>
  );
};
export default App;
