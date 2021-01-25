import React from "react";

const AuthForm = ({
  email = "",
  password = "",
  loading,
  setEmail = (f) => f,
  setPassword,
  handleSubmit,
  showPasswordInput = false,
  buttonName,
  hideEmailInput,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {!hideEmailInput && (
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
      )}
      {showPasswordInput && (
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
      )}

      <button
        className="btn btn-raised btn-primary"
        disabled={!email || loading}
      >
        {buttonName}
      </button>
    </form>
  );
};

export default AuthForm;
