import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import { Loader } from "../components/Loader";
import { getRealTimeData } from "../config/firestore";
import { VerticalBarGraph } from "../components/Charts";
import { findCorrectIncorrect } from "../utils/calculations";
export const SubjectResultPage = () => {
  const location = useLocation();
  const { doc } = location.state;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [graphData1, setGraphData1] = useState([]);

  const screenClassnames = classNames("h-screen", "flex", "justify-center", {
    "items-center": loading,
  });
  useEffect(() => {
    getRealTimeData("experiments", doc.uid, setData, setLoading);
  }, []);

  const countCorrectIncorrect = (data) => {
    let array = data.data;
    let correct = 0;
    let incorrect = 0;
    for (let i = 0; i < array.length; i++) {
      let dataPoint = array[i];
      if (findCorrectIncorrect(dataPoint)) {
        correct++;
      } else {
        incorrect++;
      }
    }
    setGraphData1([correct, incorrect]);
  };

  useEffect(() => {
    if (!loading) {
      countCorrectIncorrect(data);
    }
  }, [data]);

  return (
    <div className={screenClassnames}>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full m-5">
          <span className="text-2xl font-bold">Results: {doc.data.name}</span>
          <br />
          <span className="text-xl font-semibold mt-5">Graphs</span>
          <div className="mt-2 w-1/2 h-1/2">
            <span className="text-m font-semibold mt-5">
              Trial: {data.data.length}/60
            </span>

            <span className="text-m font-semibold mt-5 ml-5">
              Correct: {graphData1[0]}/60
            </span>

            <span className="text-m font-semibold mt-5 ml-5">
              Incorrect: {graphData1[1]}/60
            </span>
            <VerticalBarGraph
              data={{
                labels: ["Correct", "Incorrect"],
                datasets: [
                  {
                    data: graphData1,
                    backgroundColor: [
                      "rgba(31,41,55, 1)",
                      "rgba(205,208,211,1)",
                    ],
                    borderColor: ["rgba(31,41,55, 1)", "rgba(205,208,211,1)"],
                  },
                ],
              }}
              options={{
                elements: {
                  bar: {
                    borderWidth: 1,
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: "Total correct & incorrect",
                  },
                },
              }}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Coherence</th>
                  <th>Initial Direction</th>
                  <th>Final Direction</th>
                  <th>Reported Direction</th>
                  <th>Angle Change</th>
                  <th>Correct</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((dataPoint, i) => (
                  <tr className="hover" key={i}>
                    <th>{i + 1}</th>
                    <td>{dataPoint.coherence}</td>
                    <td>{dataPoint.initialDirection}</td>
                    <td>{dataPoint.finalDirection}</td>
                    <td>{dataPoint.reportedDirection}</td>
                    <td>{dataPoint.angleChange}</td>
                    <th>{dataPoint.correct ? "Yes" : "No"}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
