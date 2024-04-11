import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RDK } from "../components/RDK";
import { setData } from "../config/firestore";
import {
  bin1,
  bin2,
  bin3,
  pilot_trials,
  trial_round,
} from "../constants/trials";
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
      type: "trial",
      title: "Trial Round",
      message:
        "This is a trial round, in this round just get familiar with the task and if you have any question then do ask to experimenter",
    },
    ...trial_round,
    {
      type: "trial",
      title: "Main Round",
      message: "This is the main round, press the Start button below to start",
    },
    ...bin1,
    {
      type: "break",
      title: "Break Time!",
      message:
        "Please relex yourself but you should not leave the room and once you are ready press the Resume button below",
    },
    ...bin2,
    {
      type: "break",
      title: "Break Time!",
      message:
        "Please relex yourself but you should not leave the room and once you are ready press the Resume button below",
    },
    ...bin3,
    {
      type: "finish",
    },
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

  const submitTrialData = (data) => {
    setShowNextScreen(true);
    setTimelineIndex(timeLineIndex + 1);
  };

  return (
    <div className="w-full h-screen p-6 pt-16 flex flex-col items-center justify-center">
      <span className="text-m font-medium fixed right-6 top-16 ">
        {subjectInfo.id}
      </span>
      {timeline[timeLineIndex].type === "trial" && (
        <MidScreen info={timeline[timeLineIndex]} next={next} />
      )}
      {timeline[timeLineIndex].type === "RDK-Trial" &&
        (!showNextScreen ? (
          <RDK
            key={timeLineIndex}
            coherence={timeline[timeLineIndex].coherence}
            change={timeline[timeLineIndex].change}
            trialTime={1000}
            submitData={submitTrialData}
          />
        ) : (
          <NextScreen key={timeLineIndex} />
        ))}
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
      {timeline[timeLineIndex].type === "break" && (
        <MidScreen info={timeline[timeLineIndex]} next={next} />
      )}
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

const MidScreen = ({ info, next }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold">{info.title}</h2>
      <h2 className="text-m font-semibold mt-2">{info.message}</h2>
      <button className="btn btn-neutral mt-3" onClick={next}>
        {info.type === "break" ? "Resume" : "Start"}
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
        Kindly, please fill a small survey by pressing the button below
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
