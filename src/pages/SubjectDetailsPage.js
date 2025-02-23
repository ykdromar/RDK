import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { downloadExcel } from "../utils/export";
import { exclusionQuestions } from "../constants/exclusion";
import { olifeQuestions } from "../constants/olifeQuestions";
export const SubjectDetailsPage = () => {
  const loaction = useLocation();
  const doc = loaction.state;
  const [exclusionKeys, setExclusionKeys] = useState([]);
  const [olifeKeys, setOlifeKeys] = useState([]);

  useEffect(() => {
    if (doc.data.exclusionQuestions) {
      const rawExclusionKeys = Object.keys(doc.data.exclusionQuestions);
      setExclusionKeys(rawExclusionKeys);
    }

    if (doc.data.olifeQuestions) {
      const rawOlifeKeys = Object.keys(doc.data.olifeQuestions);
      setOlifeKeys(rawOlifeKeys);
    }
  }, []);

  return (
    <div className="w-full p-6 pt-16 ">
      <span className="text-2xl font-bold">Subject Details</span>
      <div className="w-full overflow-x-auto">
        <table className="table">
          <thead>
            <th>Id</th>
            <th>Age</th>
            <th>Gender</th>
          </thead>
          <tbody>
            <tr className="hover">
              <td>{doc.uid}</td>
              <td>{doc.data.age}</td>
              <td>{doc.data.gender}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex justify-between items-center ">
        <span className="text-xl font-semibold">Exclusion Questions</span>
        <button
          className="btn ml-2"
          onClick={() => {
            downloadData(
              `${doc.uid}-exclusion`,
              doc.data.exclusionQuestions,
              exclusionQuestions
            );
          }}
        >
          Download
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Question</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {exclusionKeys.map((key, i) => (
              <tr className="hover" key={i}>
                <th>{i + 1}</th>
                <td>{exclusionQuestions[parseInt(key)]}</td>
                <td>{doc.data.exclusionQuestions[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <span className="text-xl font-semibold">O-Life Questions</span>
        <button
          className="btn ml-2"
          onClick={() => {
            downloadData(
              `${doc.uid}-olife`,
              doc.data.olifeQuestions,
              olifeQuestions
            );
          }}
        >
          Download
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Question</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {olifeKeys.map((key, i) => (
              <tr className="hover" key={i}>
                <th>{i + 1}</th>
                <td>{olifeQuestions[parseInt(key)]}</td>
                <td>{doc.data.olifeQuestions[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const downloadData = (fileName, data, questions) => {
  const keys = Object.keys(data);
  let array = [];
  keys.map((key) => {
    let q = questions[parseInt(key)];
    let ans = data[key];
    array.push({ question: q, answer: ans });
  });
  downloadExcel(fileName, array);
};
