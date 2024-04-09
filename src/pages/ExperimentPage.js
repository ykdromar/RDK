import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RDK } from "../components/RDK";
import { setData } from "../config/firestore";
import { pilot_trials } from "../constants/trials";
import { Link } from "react-router-dom";
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

  const next = () => {
    setTimelineIndex(timeLineIndex + 1);
  };

  const timeline = [
    {
      type: "finish",
    },
    {
      type: "break",
    },
    ...pilot_trials,
  ];
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
      {timeline[timeLineIndex].type === "break" && <BreakScreen next={next} />}
      {timeline[timeLineIndex].type === "finish" && (
        <FinishScreen
          next={next}
          subjectInfo={subjectInfo}
          navigate={navigate}
        />
      )}
    </div>
  );
};

const BreakScreen = ({ next }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold">Break Time</h2>
      <h2 className="text-m font-semibold mt-2">
        Please relex yourself but you should not leave the room and once you are
        ready press the Resume button below
      </h2>
      <button className="btn btn-neutral mt-3" onClick={next}>
        Resume
      </button>
    </div>
  );
};

const FinishScreen = ({ next, subjectInfo, navigate }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold">
        Thank You for performing the experiment
      </h2>
      <h2 className="text-m mt-2">
        Kindly, please fill a small survey by prssing the button below
      </h2>
      <button
        className="btn btn-neutral mt-3"
        onClick={() => {
          navigate("/new-experiment/olife", { state: subjectInfo });
        }}
      >
        Go to survey
      </button>
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
