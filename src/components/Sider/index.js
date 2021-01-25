import React from "react";
import { Link } from "react-router-dom";

const Sider = () => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/password/update">
            Change Password
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/post/create">
            Posts
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sider;
