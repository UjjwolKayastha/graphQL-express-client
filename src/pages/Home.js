import React from "react";

import { gql } from "apollo-boost";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

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
  const { data, loading, error } = useQuery(GET_ALL_POSTS);

  const [
    fetchPosts,
    { data: posts, loading: postsLoading, error: postsError },
  ] = useLazyQuery(GET_ALL_POSTS);

  //   console.log("DATA", data);
  //   console.log("POSTS", posts);

  if (loading) return <p className="p-5">Loading....</p>;
  return (
    <div className="container">
      <div className="row p-5">
        {data.allPosts.map((p) => (
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
      </div>
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
