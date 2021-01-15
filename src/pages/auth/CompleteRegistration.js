import React, { useState, useEffect, useContext } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import AuthForm from "../../components/forms/AuthForm";

const CREATE_USER = gql`
  mutation createUser {
    userCreate {
      username
      email
    }
  }
`;

const CompleteRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, [history]);

  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // validation
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      //   console.log(result);
      if (result.user.emailVerified) {
        localStorage.removeItem("email");
        let user = auth.currentUser;
        await user.updatePassword(password);

        //dispatch user with token and email
        const idTokenResult = await user.getIdTokenResult();
        // console.log(idTokenResult);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: { email: user.email, token: idTokenResult.token },
        });

        //make API request to save and update (database)
        createUser();

        //redirect
        history.push("/");
      }
    } catch (error) {
      console.error("complete register error", error.message);
      setLoading(false);
      toast.error("Couldn't complete registration");
    }
  };

  return (
    <div className="container p-5">
      {loading ? (
        <h4 className="text-info">Loading...</h4>
      ) : (
        <h4 className="text-primary">Continue Registration</h4>
      )}
      <AuthForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loading={loading}
        handleSubmit={handleSubmit}
        buttonName={"Register"}
        showPasswordInput
      />
    </div>
  );
};

export default CompleteRegistration;
