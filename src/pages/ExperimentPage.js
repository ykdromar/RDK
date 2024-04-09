import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RDK } from "../components/RDK";
import { updateData } from "../config/firestore";
import { InstructionsPage } from "./InstructionsPage";
import { downloadExcel } from "../utils/export";
import { trials } from "../constants/trials";
export const ExperimentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const subjectInfo = location.state;

  useEffect(() => {
    if (subjectInfo == null) {
      navigate("/");
    }
  });

  const [experimentData, setExperimentData] = useState([]);
  const [timeLineIndex, setTimelineIndex] = useState(0);
  const [showNextScreen, setShowNextScreen] = useState(true);

  const NextScreen = () => {
    return (
      <div className="mt-5">
        <button
          className="btn btn-neutral"
          onClick={() => {
            setShowNextScreen(false);
          }}
        >
          Next
        </button>
      </div>
    );
  };

  const timeline = [
    { type: "instructions" },
    ...trials,
    { type: "finish", message: "Thanks for performing experiment" },
  ];
  const submitData = (data) => {
    // let newData = [...experimentData, data];
    // setExperimentData(newData);
    // setShowNextScreen(true);
    // setTimelineIndex(timeLineIndex + 1);
    // updateData("experiments", subjectInfo.id, {
    //   ...subjectInfo,
    //   data: newData,
    // });
  };

  const next = () => {
    setTimelineIndex(timeLineIndex + 1);
  };

  return (
    <div className="flex flex-col items-center pt-3">
      <h1 className="text-2xl font-bold mb-4">Experiment</h1>
      <span>{subjectInfo.id}</span>
      {timeline[timeLineIndex].type === "instructions" && (
        <InstructionsPage next={next} />
      )}
      {timeline[timeLineIndex].type === "RDK" &&
        (!showNextScreen ? (
          <RDK
            key={timeLineIndex}
            coherence={timeline[timeLineIndex].coherence}
            change={timeline[timeLineIndex].change}
            trialTime={1000}
            submitData={submitData}
          />
        ) : (
          <NextScreen key={timeLineIndex} />
        ))}
      {timeline[timeLineIndex].type === "finish" && (
        <div className="flex flex-col items-center mt-5 ">
          <span className="text-lg font-medium ">
            {timeline[timeLineIndex].message}
          </span>
          <div className="overflow-x-auto mt-5">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Trial count</th>
                  <th>Initial Direction Angle</th>
                  <th>Final Direction Angle</th>
                  <th>Reported Direction Angle</th>
                  <th>Coherence</th>
                  <th>Angle Change</th>
                </tr>
              </thead>
              <tbody>
                {experimentData.map((e, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{e.initialDirection}</td>
                    <td>{e.finalDirection}</td>
                    <td>{e.reportedDirection}</td>
                    <td>{e.coherence}</td>
                    <td>{e.angleChange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-4/12 flex justify-evenly mt-5">
            <button
              className="btn btn-neutral"
              onClick={() => {
                downloadExcel(
                  `${subjectInfo.id}-${subjectInfo.name.replace(" ", "_")}`,
                  experimentData
                );
              }}
            >
              Download
            </button>
            <button
              className="btn btn-neutral"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
