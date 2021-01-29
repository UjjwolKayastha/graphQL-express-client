import { gql } from "apollo-boost";
import { USER_INFO } from "./fragments";

export const GetUserProfile = gql`
  query {
    profile {
      ...userInfo
    }
  }
  ${USER_INFO}
`;

export const GetAllPosts = gql`
  query {
    allPosts {
      id
      title
      description
    }
  }
`;

export const GetAllUsers = gql`
  query {
    allUsers {
      ...userInfo
    }
  }
  ${USER_INFO}
`;
