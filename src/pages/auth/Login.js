import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";
import { auth } from "../../firebase";

const Login = () => {
  const { dispatch } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then(async (result) => {
          const { user } = result;
          const idTokenResult = await user.getIdTokenResult();

          dispatch({
            type: "LOGGED_IN_USER",
            payload: { email: user.email, token: idTokenResult.token },
          });

          //send user info to server

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

  return (
    <div className="container">
      {loading ? (
        <h4 className="text-info mt-4">Loading...</h4>
      ) : (
        <h4 className="text-primary mt-4">Login</h4>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            value={email}
            placeholder="Enter email"
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="Enter password"
          />
        </div>

        <button
          className="btn btn-raised btn-primary"
          disabled={!email || !password || loading}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
