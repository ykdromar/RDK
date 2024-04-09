import React from "react";
import { useForm } from "react-hook-form";
import { setData } from "../config/firestore";
import { useNavigate } from "react-router-dom";
export const NewExperimentPage = () => {
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
    <div className="w-full p-6 pt-16 flex items-center justify-between ">
      <div className="w-1/2 flex flex-col  justify-center m-3">
        <h2 className="text-2xl font-bold">New Experiment</h2>
        <h2 className="text-xl font-bold">Welcome to the Perception Test</h2>
        <p>
          Welcome to the Random Dot Kinematogram (RDK) Experiment! Your
          participation is invaluable in helping us understand how individuals
          perceive motion direction.
        </p>
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mt-3 m-3">
          Please fill up your details
        </h2>
        <form
          onSubmit={handleSubmit(async (data) => {
            let id = data.id;
            setData("subjects", id, data);
            reset();
            navigate("/new-experiment/exlusion-inclusion", { state: data });
          })}
          className="w-6/12 min-w-56 mt-1"
        >
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">What is your id?</span>
            </div>
            <input
              type="text"
              {...register("id", { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
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
          </label>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Male</span>
              <input
                type="radio"
                name="radio-10"
                className="radio"
                value="Male"
                {...register("gender", { required: true })}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Female</span>
              <input
                type="radio"
                name="radio-10"
                className="radio"
                value="Female"
                {...register("gender", { required: true })}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Prefer not to say</span>
              <input
                type="radio"
                name="radio-10"
                className="radio"
                value="Prefer not to say"
                {...register("gender", { required: true })}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">
                I provide my consent to perform this experiment on me.
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
              type="reset"
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
    </div>
  );
};
