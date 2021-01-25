import React, { useState } from "react";
import AuthForm from "../../components/forms/AuthForm";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {};
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
