import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { GetAllUsers } from "../graphql/queries";
import UserCard from "../components/UserCard";

const Users = () => {
  const { data, loading, error } = useQuery(GetAllUsers);

  if (loading) return <p className="p-5">Loading....</p>;
  return (
    <div className="container">
      <div className="row p-5">
        {data &&
          data.allUsers.map((user) => (
            <div className="col-md-4">
              <UserCard user={user} />
            </div>
          ))}
      </div>
    </div>
  );
};
export default Users;
