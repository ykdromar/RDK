import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RDK } from "../components/RDK";
import { setData } from "../config/firestore";
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
      <div className="">
        <button
          className="btn btn-neutral"
          onClick={() => {
            setShowNextScreen(false);
          }}
        >
          Show
        </button>
      </div>
    );
  };

  const timeline = [...trials];
  const submitData = (data) => {
    if (data != null) {
      let newData = [...experimentData, data];
      setExperimentData(newData);
      setShowNextScreen(true);
      setTimelineIndex(timeLineIndex + 1);
      setData("newExperiments", subjectInfo.id, {
        data: newData,
      });
    } else {
      setShowNextScreen(true);
      setTimelineIndex(timeLineIndex + 1);
    }
    console.log(data);
  };

  return (
    <div className="w-full h-screen p-6 pt-16 flex flex-col items-center justify-center">
      <span className="text-m font-medium fixed right-6 top-16 ">
        {subjectInfo.id}
      </span>
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
    </div>
  );
};

// {timeline[timeLineIndex].type === "finish" && (
//   <div className="flex flex-col items-center mt-5 ">
//     <span className="text-lg font-medium ">
//       {timeline[timeLineIndex].message}
//     </span>
//     <div className="overflow-x-auto mt-5">
//       <table className="table">
//         {/* head */}
//         <thead>
//           <tr>
//             <th>Trial count</th>
//             <th>Initial Direction Angle</th>
//             <th>Final Direction Angle</th>
//             <th>Reported Direction Angle</th>
//             <th>Coherence</th>
//             <th>Angle Change</th>
//           </tr>
//         </thead>
//         <tbody>
//           {experimentData.map((e, i) => (
//             <tr key={i}>
//               <td>{i + 1}</td>
//               <td>{e.initialDirection}</td>
//               <td>{e.finalDirection}</td>
//               <td>{e.reportedDirection}</td>
//               <td>{e.coherence}</td>
//               <td>{e.angleChange}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     <div className="w-4/12 flex justify-evenly mt-5">
//       <button
//         className="btn btn-neutral"
//         onClick={() => {
//           downloadExcel(
//             `${subjectInfo.id}-${subjectInfo.name.replace(" ", "_")}`,
//             experimentData
//           );
//         }}
//       >
//         Download
//       </button>
//       <button
//         className="btn btn-neutral"
//         onClick={() => {
//           navigate("/");
//         }}
//       >
//         Home
//       </button>
//     </div>
//   </div>
// )}
