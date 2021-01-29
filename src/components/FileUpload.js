import React, { useContext } from "react";

import Resizer from "react-image-file-resizer";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import Image from "./Image";

const FileUpload = ({ loading, values, setValues }) => {
  const { state } = useContext(AuthContext);
  const { images } = values;

  console.log("IMAGES", values);
  const fileResizeAndUpload = (event) => {
    let fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_REST_API}/uploadimages`,
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: state.user.token,
                  },
                }
              )
              .then((response) => {
                setValues({
                  ...values,
                  images: [...images, response.data],
                });
                console.log(response);
                toast.success("Image Uploaded successfully.");
              })
              .catch((error) => {
                console.log("CLOUDINARY UPLOAD FAILED", error);
              });
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleImageRemove = (id) => {
    axios
      .post(
        `${process.env.REACT_APP_REST_API}/removeimage`,
        {
          public_id: id,
        },
        {
          headers: {
            authtoken: state.user.token,
          },
        }
      )
      .then((response) => {
        let filteredImages = images.filter((item) => {
          return item.public_id !== id;
        });
        setValues({ ...values, images: filteredImages });
        toast.info("Image successfully deleted");
      })
      .catch((error) => {
        console.log("IMAGE REMOVE ERROR", error);
      });
  };

  return (
    <div className="row">
      <div className="col-md-3">
        <div className="form-group">
          <label className="btn btn-primary">
            Upload Image
            <input
              hidden
              className="form-control"
              disabled={loading}
              type="file"
              accept="image/*" //accepts file types with any extension
              onChange={fileResizeAndUpload}
            />
          </label>
        </div>
      </div>
      <div
        className="col-md-9"
        style={{ display: "flex", flexDirection: "row" }}
      >
        {images.map((image) => (
          <Image image={image} handleImageRemove={handleImageRemove} />
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
