import React from "react";
import { useLocation } from "react-router-dom";
import { exclusionQuestions } from "../constants/exclusion";
import { olifeQuestions } from "../constants/olifeQuestions";
export const SubjectDetailsPage = () => {
  const loaction = useLocation();
  const doc = loaction.state;

  const exclusionKeys = Object.keys(doc.data.exclusionQuestions);
  const olifeKeys = Object.keys(doc.data.olifeQuestions);

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
      <span className="text-xl font-semibold mt-3">Exclusion Questions</span>
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
      <span className="text-xl font-semibold mt-3">O-Life Questions</span>
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
