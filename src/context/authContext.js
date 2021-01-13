import React, { useReducer, createContext } from "react";

//reducer -> updates state
const firebaseReducer = (state, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

//state
const initialState = {
  user: null,
};

// create context
const AuthContext = createContext();

// create context provider (wraps application)
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(firebaseReducer, initialState); //takes 2 arguments 1. reducer

  const value = { state, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export
export { AuthContext, AuthProvider };
