import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CompleteRegistration from "./pages/auth/CompleteRegistration";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_API,
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Nav />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/complete-registration"
          component={CompleteRegistration}
        />
      </Switch>
    </ApolloProvider>
  );
};
export default App;
