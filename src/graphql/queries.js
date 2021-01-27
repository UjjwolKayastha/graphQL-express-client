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
