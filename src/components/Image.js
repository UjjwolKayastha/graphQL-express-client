import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Image = ({ image, handleImageRemove = (f) => f }) => {
  return (
    <div key={image.public_id} id="image-container">
      <img
        key={image.public_id}
        height="100px"
        src={image.url}
        alt={image.public_id}
        id="image"
      />
      <span id="delete" onClick={() => handleImageRemove(image.public_id)}>
        <FontAwesomeIcon icon={faTrash} />
      </span>
    </div>
  );
};

export default Image;
