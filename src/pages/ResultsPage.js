import React, { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { getAllDocs } from "../config/firestore";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
export const ResultsPage = () => {
  const [loading, setLoading] = useState(true);
  const [docs, setDocs] = useState([]);
  const navigate = useNavigate();
  const fetchDocs = async () => {
    setLoading(true);
    let docs = await getAllDocs("experiments");
    if (docs) {
      setDocs(docs);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const screenClassnames = classNames("h-screen", "flex", "justify-center", {
    "items-center": loading,
  });

  return (
    <div className={screenClassnames}>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full m-5">
          <span className="text-2xl font-bold">Results</span>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th>Mobile Number</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {docs.map((doc, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{doc.data.name}</td>
                    <td>{doc.data.age}</td>
                    <td>{doc.data.email}</td>
                    <td>{doc.data.mobile}</td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => {
                          navigate(`./${doc.uid}`, { state: { doc } });
                        }}
                      >
                        View
                      </button>
                    </td>
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
