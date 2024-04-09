import React, { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { getAllDocs } from "../config/firestore";
import { useNavigate } from "react-router-dom";
export const ResultsPage = () => {
  const [loading, setLoading] = useState(true);
  const [docs, setDocs] = useState([]);
  const navigate = useNavigate();
  const fetchDocs = async () => {
    setLoading(true);
    let docs = await getAllDocs("subjects");
    if (docs) {
      setDocs(docs);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full p-6 pt-16 ">
      <span className="text-2xl font-bold">Results</span>
      <div className="overflow-x-auto ">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Id</th>
              <th>Age</th>
              <th>Gender</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{doc.data.id}</td>
                <td>{doc.data.age}</td>
                <td>{doc.data.gender}</td>
                <td className="flex justify-evenly">
                  <button
                    className="btn btn-neutral "
                    onClick={() => {
                      navigate(`./${doc.uid}/details`, { state: doc });
                    }}
                  >
                    View Details
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      navigate(`./${doc.uid}`);
                    }}
                  >
                    View Data
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
