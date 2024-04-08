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
  const [graphData1, setGraphData1] = useState([0, 0]);
  const [graphData2, setGraphData2] = useState([]);

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

  const binSize = 45; // Adjust the bin size as needed
  const generateFrequencyData = (rawData) => {
    let data = rawData.data;

    const frequencies = Array.from({ length: 360 / binSize }, () => 0);
    data.forEach((trial) => {
      const binIndex = Math.floor(trial.initialDirection / binSize);
      frequencies[binIndex]++;
    });
    setGraphData2(frequencies);
  };

  useEffect(() => {
    if (!loading) {
      countCorrectIncorrect(data);
      generateFrequencyData(data);
    }
  }, [data]);

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full p-6 pt-16">
      <span className="text-2xl font-bold">Results: {doc.data.name}</span>
      <br />
      <span className="text-xl font-semibold mt-5">Graphs</span>
      <div className="mt-2 w-full h-1/2 flex">
        <div className="w-1/3 mt-5 border-r-2 p-1 mr-1">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Count</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover">
                <th>Trial</th>
                <td>{data.data.length}</td>
                <td>60</td>
              </tr>
              <tr className="hover">
                <th>Correct</th>
                <td>{graphData1[0]}</td>
                <td>60</td>
              </tr>
              <tr className="hover">
                <th>Incorrect</th>
                <td>{graphData1[1]}</td>
                <td>60</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-1/3">
          <VerticalBarGraph
            className=" p-1 mr-1"
            data={{
              labels: ["Correct", "Incorrect"],
              datasets: [
                {
                  data: graphData1,
                  backgroundColor: ["rgba(31,41,55, 1)", "rgba(205,208,211,1)"],
                  borderColor: ["rgba(31,41,55, 1)", "rgba(205,208,211,1)"],
                },
              ],
            }}
            options={{
              elements: {
                bar: {
                  borderWidth: 0,
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
        <div className="w-1/3">
          <VerticalBarGraph
            data={{
              labels: graphData2.map(
                (_, index) => `${index * binSize}-${(index + 1) * binSize}`
              ),
              datasets: [
                {
                  data: graphData2,
                  backgroundColor: ["rgba(31,41,55, 1)"],
                  borderColor: ["rgba(31,41,55, 1)"],
                },
              ],
            }}
            options={{
              elements: {
                bar: {
                  borderWidth: 1,
                },
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: "Frequecny Distribution of Directions",
                },
              },
            }}
          />
        </div>
      </div>
      <div className="overflow-x-auto mt-5">
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
  );
};
