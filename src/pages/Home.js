import React, { useContext } from "react";

import { gql } from "apollo-boost";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/authContext";
import { useHistory } from "react-router-dom";
import Sider from "../components/Sider/index";

const GET_ALL_POSTS = gql`
  {
    allPosts {
      id
      title
      description
    }
  }
`;

const Home = () => {
  // const { data, loading, error } = useQuery(GET_ALL_POSTS);

  const [
    fetchPosts,
    { data: posts, loading: postsLoading, error: postsError },
  ] = useLazyQuery(GET_ALL_POSTS);

  //   console.log("DATA", data);
  //   console.log("POSTS", posts);

  //access context
  // const { state, dispatch } = useContext(AuthContext);

  //   const updateUserName = () => {
  //     dispatch({
  //       type: "LOGGED_IN_USER",
  //       payload: "AL",
  //     }); //takes 2 arguements.
  //   };

  //   let history = useHistory();
  //   console.log(history);

  // if (loading) return <p className="p-5">Loading....</p>;
  return (
    <div className="container">
      {/* <div className="row p-5">
        {data &&
          data.allPosts.map((p) => (
            <div key={p.id} className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    <h4>{p.title}</h4>
                  </div>
                  <div className="card-text">{p.description}</div>
                  <hr />
                </div>
              </div>
            </div>
          ))}
      </div> */}
      {/* <p>{JSON.stringify(state.user)}</p> */}
      {/* <buttton className="btn btn-primary" onClick={() => updateUserName()}>
        Change Username
      </buttton> */}
      <div className="p-5">
        <button
          onClick={() => fetchPosts()}
          className="btn-btn-raised btn-primary"
        >
          Fetch posts
        </button>
      </div>
    </div>
  );
};
export default Home;
