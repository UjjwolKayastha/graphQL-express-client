import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import AuthForm from "../../components/forms/AuthForm";

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
      <AuthForm
        email={email}
        setEmail={setEmail}
        loading={loading}
        handleSubmit={handleSubmit}
        buttonName={"Register"}
      />
    </div>
  );
};

export default Register;
