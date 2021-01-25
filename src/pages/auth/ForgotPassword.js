import React, { useState } from "react";
import AuthForm from "../../components/forms/AuthForm";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
      handleCodeInApp: true,
    };

    try {
      await auth.sendPasswordResetEmail(email, config);
      setEmail("");
      setLoading(false);
      toast.success(
        `Email is sent to ${email}. Follow the link to reset your password.`
      );
    } catch (e) {
      setLoading(false);
      console.log("Password Forgot error", e);
    }
  };

  return (
    <div className="container p-5">
      {loading ? (
        <h4 className="text-danger">Loading</h4>
      ) : (
        <h4 className="text-info">Forgot Password?</h4>
      )}
      <AuthForm
        email={email}
        setEmail={setEmail}
        loading={loading}
        handleSubmit={handleSubmit}
        buttonName={"Submit"}
      />
    </div>
  );
};

export default ForgotPassword;
