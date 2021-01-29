import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const UserImage = ({
  image = [{ url: "", public_id: "" }],
  handleImageRemove = (f) => f,
}) => {
  console.log("IMG", image.url);
  if (image.url === undefined) {
    console.log("IMGPATH");
    return (
      <div key={image.public_id} id="image-container">
        <img
          height="100px"
          src={"/noImage.jpg"}
          alt="noImage"
          id="image"
          style={{ borderRadius: 50, minHeight: 100 }}
        />
      </div>
    );
  }
  return (
    <div key={image.public_id} id="image-container">
      <img
        key={image.public_id}
        height="100px"
        src={image.url}
        alt={image.public_id}
        id="image"
        style={{ borderRadius: 50 }}
      />
      <span id="delete" onClick={() => handleImageRemove(image.public_id)}>
        <FontAwesomeIcon icon={faTrash} />
      </span>
    </div>
  );
};

export default UserImage;
