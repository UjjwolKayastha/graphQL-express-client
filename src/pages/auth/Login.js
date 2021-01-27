import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";
import { auth, googleAuthProvider } from "../../firebase";
import { useMutation } from "@apollo/react-hooks";
import AuthForm from "../../components/forms/AuthForm";
import { CreateUser } from '../../graphql/mutations';



const Login = () => {
  const { dispatch } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [createUser] = useMutation(CreateUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then(async (result) => {
          const { user } = result;
          const idTokenResult = await user.getIdTokenResult();
          console.log(idTokenResult.token);

          dispatch({
            type: "LOGGED_IN_USER",
            payload: { email: user.email, token: idTokenResult.token },
          });

          //send user info to server
          createUser();

          //redirect
          history.push("/");
          toast.success("Logged in successfully.");
        });
    } catch (error) {
      console.error("login error", error.message);
      setLoading(false);
      setPassword("");
      toast.error("Couldn't login.");
    }
  };

  const googleLogin = async () => {
    await auth.signInWithPopup(googleAuthProvider).then(async (result) => {
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: "LOGGED_IN_USER",
        payload: { email: user.email, token: idTokenResult.token },
      });

      //send user info to server
      createUser();

      //redirect
      history.push("/");
      toast.success("Logged in successfully.");
    });
  };

  return (
    <div className="container">
      {loading ? (
        <h4 className="text-info mt-4">Loading...</h4>
      ) : (
        <h4 className="text-primary mt-4">Login</h4>
      )}
      <button
        onClick={googleLogin}
        className="btn btn-raised btn-danger mt-4 mb-3"
      >
        Login with Google
      </button>
      <AuthForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loading={loading}
        handleSubmit={handleSubmit}
        buttonName={"Login"}
        showPasswordInput
      />
      <Link className="text-danger float-right" to="/password/forgot">
        Forgot Password?
      </Link>
    </div>
  );
};

export default Login;
