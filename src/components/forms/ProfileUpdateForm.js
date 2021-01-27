import React from "react";

const ProfileUpdateForm = ({
  handleSubmit,
  handleChange,
  handleImageChange,
  loading,
  username,
  email,
  name,
  about,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="">Username</label>
        <input
          value={username}
          className="form-control"
          disabled={loading}
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="Username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="">Name</label>
        <input
          className="form-control"
          disabled={loading}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="">Email</label>
        <input
          className="form-control"
          disabled
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="">Image</label>
        <input
          className="form-control"
          disabled={loading}
          type="file"
          accept="image/*" //accepts file types with any extension
          onChange={handleImageChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="">About</label>
        <textarea
          className="form-control"
          disabled={loading}
          type="textarea"
          name="about"
          value={about}
          onChange={handleChange}
          placeholder="About"
        />
      </div>
      <button
        className="btn btn-primary"
        type="submit"
        disabled={!email || loading}
      >
        Update
      </button>
    </form>
  );
};

export default ProfileUpdateForm;
