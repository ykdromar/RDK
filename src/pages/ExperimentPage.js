import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { RDK } from "../components/RDK";
export const ExperimentPage = () => {
  const location = useLocation();
  const subjectInfo = location.state;
  const [experimentData, setExperimentData] = useState([]);

  const submitData = (data) => {
    setExperimentData([...experimentData, data]);
  };

  useEffect(() => {
    console.log(experimentData);
  }, [experimentData]);

  return (
    <div className="flex flex-col items-center pt-3">
      <h1 className="text-2xl font-bold mb-4">Experiment</h1>
      <RDK coherence={50} trialTime={10000} submitData={submitData} />
    </div>
  );
};
