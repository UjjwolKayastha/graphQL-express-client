import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { Route, Switch } from "react-router-dom";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_API,
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </ApolloProvider>
  );
};
export default App;
