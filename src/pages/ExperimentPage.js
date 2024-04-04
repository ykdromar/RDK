import React from "react";
import { useLocation } from "react-router-dom";
export const ExperimentPage = () => {
  const location = useLocation();
  const data = location.state;
  return <div>Experiment</div>;
};
