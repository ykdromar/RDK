import React from "react";
import { Link } from "react-router-dom";
export const FinishPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold">Thank You for filling the survey</h2>
      <Link to="/" className="btn btn-neutral mt-3">
        Go to Home
      </Link>
    </div>
  );
};
