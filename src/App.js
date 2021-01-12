import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import Home from "./pages/Home";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_API,
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
};
export default App;
