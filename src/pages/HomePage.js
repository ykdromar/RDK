import React from "react";
import { useEffect, useState } from "react";
import { firebaseGetUser } from "../config/firebaseAuth";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
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
          <CollectOlife />
          <Link to="/results" className="btn  mt-5 mx-2" onClick={() => {}}>
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

const CollectOlife = () => {
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const btnClassnames = classNames("btn", "btn-neutral", "mt-3", {
    "btn-disabled": id === "",
  });

  return (
    <>
      <button
        className="btn btn-neutral"
        onClick={() => document.getElementById("olife-modal").showModal()}
      >
        Collect O-Life
      </button>
      <dialog id="olife-modal" className="modal">
        <div className="modal-box flex flex-col items-center">
          <h2 className="text-xl font-semibold">Collect O-Life</h2>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Participant Id</span>
            </div>
            <input
              type="text"
              placeholder="Participant Id"
              className="input input-bordered w-full"
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </label>
          <button
            className={btnClassnames}
            onClick={() => {
              navigate("/new-experiment/olife", { state: { id: id } });
            }}
          >
            Go
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};
