import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RDK } from "../components/RDK";
import { setData, updateData } from "../config/firestore";
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
  const timeline = [
    { type: "RDK", coherence: 50 },
    { type: "finish", message: "Thanks for performing experiment" },
  ];
  const submitData = (data) => {
    let newData = [...experimentData, data];
    setExperimentData(newData);
    setTimelineIndex(timeLineIndex + 1);
    updateData("experiments", subjectInfo.id, {
      ...subjectInfo,
      data: newData,
    });
  };

  // useEffect(() => {
  //   console.log(experimentData);
  // }, [experimentData]);

  const experiment = () => {
    switch (timeline[timeLineIndex].type) {
      case "RDK":
        return (
          <RDK
            coherence={timeline[timeLineIndex].coherence}
            trialTime={1000}
            submitData={submitData}
          />
        );
      case "finish":
        return (
          <div className="flex flex-col items-center mt-5 ">
            <span className="text-lg font-medium ">
              {timeline[timeLineIndex].message}
            </span>
            <div className="overflow-x-auto mt-5">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Initial Direction Angle</td>
                    <td>{experimentData[0].initialDirection}</td>
                  </tr>
                  <tr>
                    <td>Final Direction Angle</td>
                    <td>{experimentData[0].finalDirection}</td>
                  </tr>
                  <tr>
                    <td>Reported Direction Angle</td>
                    <td>{experimentData[0].reportedDirection}</td>
                  </tr>
                  <tr>
                    <td>coherence</td>
                    <td>{experimentData[0].coherence}</td>
                  </tr>
                  <tr>
                    <td>Angle Change</td>
                    <td>{experimentData[0].angleChange}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return;
    }
  };

  return (
    <div className="flex flex-col items-center pt-3">
      <h1 className="text-2xl font-bold mb-4">Experiment</h1>
      {experiment()}
    </div>
  );
};
