import { gql } from "apollo-boost";

export const USER_INFO = gql`
  fragment userInfo on User {
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
`;
