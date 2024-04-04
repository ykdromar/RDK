import React from "react";
import { useForm } from "react-hook-form";
import { setData } from "../config/firestore";
import { uid } from "uid";
import { useNavigate } from "react-router-dom";
export const HomePage = () => {
  const navigate = useNavigate();
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const consent = watch("consent");

  return (
    <div className="mt-5 flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold">Please Fill up your details</h2>
      <form
        onSubmit={handleSubmit(async (data) => {
          let id = uid(11);
          setData("experiments", id, data);
          console.log(id);
          reset();
          navigate("/experiment", { state: { id, ...data } });
        })}
        className="w-3/12 min-w-56 mt-3"
      >
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">What is your name?</span>
          </div>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          {errors.name && (
            <div className="label">
              <span className="label-text text-sm text-red-500">
                Please enter your name !
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">What is your age?</span>
          </div>
          <input
            type="number"
            {...register("age", { required: true })}
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          {errors.name && (
            <div className="label">
              <span className="label-text text-sm text-red-500">
                Please enter your age !
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">What is your email id?</span>
          </div>
          <input
            type="text"
            {...register("email", { required: true })}
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          {errors.name && (
            <div className="label">
              <span className="label-text text-sm text-red-500">
                Please enter your email id !
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">What is your mobile number?</span>
          </div>
          <input
            type="text"
            {...register("mobile", { required: true })}
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          {errors.name && (
            <div className="label">
              <span className="label-text text-sm text-red-500">
                Please enter your mobile number !
              </span>
            </div>
          )}
        </label>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">
              I have read all the terms & conditions, and I provide my consent
              to perform this experiment on myself.
            </span>
            <input
              type="checkbox"
              {...register("consent")}
              className="checkbox"
            />
          </label>
        </div>
        <div className="w-full flex justify-evenly mt-3">
          <button
            onClick={() => {
              reset();
            }}
            className="btn"
          >
            Clear
          </button>
          <button
            type="submit"
            className={`btn btn-neutral ${!consent && "btn-disabled"}`}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};
