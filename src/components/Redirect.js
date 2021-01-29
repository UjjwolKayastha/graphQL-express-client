import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Redirect = ({ path }) => {
  const [count, setCount] = useState(5);
  let history = useHistory();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && history.push(path);

    return () => clearInterval(interval);
  }, [count]);
  return (
    <div className="container p-5 text-center">
      <h4 className="text-info">Redirecting you in {count} seconds...</h4>
    </div>
  );
};

export default Redirect;
