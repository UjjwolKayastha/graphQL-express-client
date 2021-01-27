import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import ProfileUpdateForm from "../../components/forms/ProfileUpdateForm";

const GetUserProfile = gql`
  query {
    profile {
      _id
      name
      email
      username
      images {
        url
        public
      }
      about
      createdAt
      updatedAt
    }
  }
`;

const UpdateUserProfile = gql`
  mutation userUpdate($input: UserUpdateInput!) {
    userUpdate(input: $input) {
      _id
      name
      email
      username
      images {
        url
        public
      }
      about
      createdAt
      updatedAt
    }
  }
`;

const Profile = () => {
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    about: "",
    images: [],
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log("CLICKED");
  };

  const handleImageChange = () => {};

  //get user info
  const { data, loading } = useQuery(GetUserProfile);

  useMemo(() => {
    if (data) {
      setValues({
        ...values,
        username: data.profile.username,
        name: data.profile.name,
        email: data.profile.email,
        about: data.profile.about,
        images: data.profile.images,
      });
    }
  }, [data]);

  //update user
  const [userUpdate] = useMutation(UpdateUserProfile, {
    update: ({ data }) => {
      console.log("UPDATED DATA", data);
      toast.success("Profile updated succesfully.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    userUpdate({ variables: { input: values } });
  };

  return (
    <>
      <h3 className="text-info">Profile Update</h3>
      {data && (
        <ProfileUpdateForm
          {...values}
          loading={loading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleImageChange={handleImageChange}
        />
      )}
    </>
  );
};

export default Profile;
