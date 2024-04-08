import React from "react";
import { useForm } from "react-hook-form";
import { firebaseLogin } from "../config/firebaseAuth";
export const LoginPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Login</h2>
      <form
        onSubmit={handleSubmit(async (data) => {
          firebaseLogin(data);
          reset();
        })}
        className="w-3/12 min-w-56 mt-3"
      >
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Email Id</span>
          </div>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email Id"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            className="input input-bordered w-full"
          />
        </label>
        <div className="w-full flex justify-evenly mt-3">
          <button
            onClick={() => {
              reset();
            }}
            className="btn"
          >
            Clear
          </button>
          <button type="submit" className={`btn btn-neutral`}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
