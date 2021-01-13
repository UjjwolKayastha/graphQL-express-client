import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    //UI message
    toast.success(
      `Email has been sent to ${email}. Please check your email and follow the link to complete registration.`
    );
    //save user to local storage
    window.localStorage.setItem("email", email);
    setEmail("");
    setLoading(false);
  };

  return (
    <div className="container p-5">
      {loading ? (
        <h4 className="text-info">LOADING...</h4>
      ) : (
        <h4 className="text-primary">REGISTER HERE</h4>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            type="email"
            value={email}
            placeholder="example@example.com"
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <button
          className="btn btn-raised btn-primary"
          disabled={!email || loading}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
