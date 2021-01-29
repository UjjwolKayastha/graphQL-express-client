import React from "react";
import UserImage from "./UserImage";

const UserCard = ({ user }) => {
  const { username, images, about, id } = user;
  console.log("USER", images);
  return (
    <div key={id} className="card">
      <div className="card-body">
        <UserImage image={images[0]} />
        <div className="card-title">
          <h6>{username}</h6>
        </div>
        <div className="card-text">{about}</div>
        <hr />
      </div>
    </div>
  );
};

export default UserCard;
