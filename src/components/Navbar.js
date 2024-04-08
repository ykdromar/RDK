import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { firebaseGetUser, firebaseLogout } from "../config/firebaseAuth";
export const Navbar = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    firebaseGetUser(setUser, () => {});
  }, []);
  return (
    <div className="navbar bg-base-100 z-10 fixed">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          RDK
        </Link>
      </div>
      <div className="navbar-end">
        {user ? (
          <div
            className="btn btn-neutral"
            onClick={() => {
              firebaseLogout();
            }}
          >
            Logout
          </div>
        ) : (
          <Link to="/login" className="btn">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
