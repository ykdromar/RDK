import React from "react";
import { useForm } from "react-hook-form";
import { setData, updateData } from "../config/firestore";
import { useLocation, useNavigate } from "react-router-dom";
export const ExclusionInclusionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const subjectInfo = location.state;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="w-full p-6 pt-16 flex flex-col items-center justify-center ">
      <h2 className="text-2xl font-bold">New Experiment</h2>
      <p className="w-2/3 text-center my-3">
        We have an exclusion criteria for this study. We are looking for healthy
        participants without any history of the following conditions.
      </p>
      <h2 className="text-xl font-semibold mt-3 m-3">
        Please fill up the following form
      </h2>

      <form
        onSubmit={handleSubmit(async (data) => {
          let id = subjectInfo.id;
          updateData("subjects", id, data);
          reset();
          let rawData = { ...subjectInfo, ...data };
          console.log(rawData);
          navigate("/new-experiment/experiment", { state: rawData });
        })}
        className="w-6/12 min-w-56 mt-1 "
      >
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">
              Clinically diagnosed with any mental health conditions
            </span>
            <input
              type="checkbox"
              className="checkbox"
              value="Clinically diagnosed with any mental health conditions"
              {...register("ix-1")}
            />
          </label>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Metal implants inside skull</span>
            <input
              type="checkbox"
              className="checkbox"
              value="Metal implants inside skull"
              {...register("ix-2")}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Pregnancy or post-partums</span>
            <input
              type="checkbox"
              className="checkbox"
              value="Pregnancy or post-partum"
              {...register("ix-3")}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">History of seizures</span>
            <input
              type="checkbox"
              className="checkbox"
              value="History of seizures"
              {...register("ix-4")}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">History of head injury</span>
            <input
              type="checkbox"
              className="checkbox"
              value="History of head injury"
              {...register("ix-5")}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Consumed Alcohol in last 2 days</span>
            <input
              type="checkbox"
              className="checkbox"
              value="Consumed Alcohol in last 2 days"
              {...register("ix-6")}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Caffeine in last 24 hours</span>
            <input
              type="checkbox"
              className="checkbox"
              value="History of head injury"
              {...register("ix-7")}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">History of head injury</span>
            <input
              type="checkbox"
              className="checkbox"
              value="History of head injury"
              {...register("ix-8")}
            />
          </label>
        </div>

        <div className="w-full flex justify-center mt-3 px-auto">
          <button
            type="reset"
            onClick={() => {
              reset();
            }}
            className="btn mx-2"
          >
            Clear
          </button>
          <button type="submit" className="btn btn-neutral mx-2">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};
