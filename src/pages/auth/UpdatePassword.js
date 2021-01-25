import React, { useState } from "react";
import AuthForm from "../../components/forms/AuthForm";
import { auth } from "../../firebase";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await auth.currentUser.updatePassword(password);
      setPassword("");
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log("Password update error", e);
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
        password={password}
        setPassword={setPassword}
        loading={loading}
        handleSubmit={handleSubmit}
        buttonName={"Update"}
        showPasswordInput
        hideEmailInput
      />
    </div>
  );
};

export default UpdatePassword;
