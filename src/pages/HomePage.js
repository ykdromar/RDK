import React from "react";
import { useEffect, useState } from "react";
import { firebaseGetUser } from "../config/firebaseAuth";
import { Link } from "react-router-dom";
export const HomePage = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    firebaseGetUser(setUser, () => {});
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <span className="text-4xl font-semibold">
        Welcome to the RDK Experiment
      </span>
      {user ? (
        <div>
          <Link
            to="/new-experiment"
            className="btn mt-5 mx-2"
            onClick={() => {}}
          >
            New Experiment
          </Link>
          <Link
            to="/results"
            className="btn btn-neutral mt-5 mx-2"
            onClick={() => {}}
          >
            View Results
          </Link>
        </div>
      ) : (
        <span className="text-lg mt-4">
          Please Login to proceed with experiment
        </span>
      )}
    </div>
  );
};
