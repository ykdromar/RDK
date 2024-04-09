import React from "react";
import { useForm } from "react-hook-form";
import { setData, updateData } from "../config/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { exclusionQuestions } from "../constants/exclusion";
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
          updateData("subjects", id, { exclusionQuestions: data });
          reset();
          let rawData = { ...subjectInfo, ...data };
          navigate("/new-experiment/instructions", { state: rawData });
        })}
        className="w-6/12 min-w-56 mt-1 "
      >
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Question</th>
                <th>Yes</th>
                <th>No</th>
              </tr>
            </thead>
            <tbody>
              {exclusionQuestions.map((q, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{q}</td>
                  <td>
                    <input
                      type="radio"
                      {...register(`${i}`, { required: true })}
                      value="Yes"
                      className="radio"
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      {...register(`${i}`, { required: true })}
                      value="No"
                      className="radio"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
