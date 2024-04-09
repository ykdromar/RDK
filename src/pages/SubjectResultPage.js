import React, { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { getRealTimeData } from "../config/firestore";
import { VerticalBarGraph } from "../components/Charts";
import { countTrials } from "../utils/calculations";
import { useParams } from "react-router-dom";
import { downloadExcel } from "../utils/export";
export const SubjectResultPage = () => {
  const { subjectId } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [graphData1, setGraphData1] = useState([0, 0, 0]);
  const [graphData2, setGraphData2] = useState([]);

  useEffect(() => {
    getRealTimeData("newExperiments", subjectId, setData, setLoading);
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

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
      countTrials(data, setGraphData1);
      generateFrequencyData(data);
    }
  }, [data]);

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full p-6 pt-16 relative">
      <span className="text-2xl font-bold">Results: {subjectId}</span>
      <button
        className="btn ml-2 absolute top-16 right-2 "
        onClick={() => {
          downloadExcel(subjectId, data.data);
        }}
      >
        Download
      </button>
      <span className="text-xl font-semibold mt-2 block">Graphs</span>
      <div className="mt-2 w-full h-1/2 flex">
        <div className="w-1/5 mt-5 border-r-2 p-1 mr-1">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover">
                <th className="pr-1">Total Trial</th>
                <td>{data.data.length}</td>
              </tr>
              <tr className="hover">
                <th className="pr-1">Final Direction</th>
                <td>{graphData1[0]}</td>
              </tr>
              <tr className="hover">
                <th className="pr-1">Initial Direction</th>
                <td>{graphData1[1]}</td>
              </tr>
              <tr className="hover">
                <th className="pr-1">Random Direction</th>
                <td>{graphData1[2]}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-2/5 flex justify-center items-center">
          <VerticalBarGraph
            className=" p-1 mr-1"
            data={{
              labels: [
                "Final Direction",
                "Initial Direction",
                "Random Direction",
              ],
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
                  text: "Classification of Reported Direction",
                },
              },
            }}
          />
        </div>
        <div className="w-2/5 flex justify-center items-center">
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
              <th>Direction Type</th>
              <th>Response Time</th>
              <th>Angle Change</th>
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
                <td>{dataPoint.directionType}</td>
                <td>{dataPoint.responseTime}</td>
                <td>{dataPoint.angleChange}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
