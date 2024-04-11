import React from "react";
import { useForm } from "react-hook-form";
import { setData, updateData } from "../config/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { olifeQuestions } from "../constants/olifeQuestions";
export const OlifePage = () => {
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
      <span className="text-m font-medium fixed right-6 top-16 ">
        {subjectInfo.id}
      </span>
      <h2 className="text-2xl font-bold">O-Life Survey</h2>
      <h2 className="text-xl font-semibold mt-3 m-3">
        Please fill up the following survey
      </h2>

      <form
        onSubmit={handleSubmit(async (data) => {
          let id = subjectInfo.id;
          updateData("subjects", id, { olifeQuestions: data });
          reset();
          navigate("/new-experiment/finish");
        })}
        className="w-10/12 min-w-56 mt-1 "
      >
        <div className="overflow-x-auto max-h-80">
          <table className="table">
            <thead className="sticky top-0 bg-white">
              <tr>
                <th></th>
                <th>Question</th>
                <th>Yes</th>
                <th>No</th>
              </tr>
            </thead>
            <tbody>
              {olifeQuestions.map((q, i) => (
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
