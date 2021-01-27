import { gql } from "apollo-boost";
import { USER_INFO } from "./fragments";

export const CreateUser = gql`
  mutation createUser {
    userCreate {
      username
      email
    }
  }
`;

export const UpdateUserProfile = gql`
  mutation userUpdate($input: UserUpdateInput!) {
    userUpdate(input: $input) {
      ...userInfo
    }
  }
  ${USER_INFO}
`;
