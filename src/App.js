import styles from "./app.module.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  HomePage,
  ExperimentPage,
  ResultsPage,
  SubjectResultPage,
  LoginPage,
  NewExperimentPage,
  ExclusionInclusionPage,
  InstructionsPage,
  OlifePage,
  FinishPage,
  SubjectDetailsPage,
} from "./pages";
import { Navbar } from "./components/Navbar";
import { useEffect, useState } from "react";
import { firebaseGetUser } from "./config/firebaseAuth";
import { Loader } from "./components/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebaseGetUser(setUser, setLoading);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route
            exact
            path="/login"
            element={user ? <Navigate replace to="/" /> : <LoginPage />}
          ></Route>
          <Route
            exact
            path="/new-experiment"
            element={
              !user ? <Navigate replace to="/" /> : <NewExperimentPage />
            }
          ></Route>
          <Route
            exact
            path="/new-experiment/exlusion-inclusion"
            element={
              !user ? <Navigate replace to="/" /> : <ExclusionInclusionPage />
            }
          ></Route>
          <Route
            exact
            path="/new-experiment/instructions"
            element={!user ? <Navigate replace to="/" /> : <InstructionsPage />}
          ></Route>
          <Route
            exact
            path="/new-experiment/experiment"
            element={!user ? <Navigate replace to="/" /> : <ExperimentPage />}
          ></Route>
          <Route
            exact
            path="/new-experiment/olife"
            element={!user ? <Navigate replace to="/" /> : <OlifePage />}
          ></Route>
          <Route
            exact
            path="/new-experiment/finish"
            element={!user ? <Navigate replace to="/" /> : <FinishPage />}
          ></Route>
          <Route
            exact
            path="/results"
            element={!user ? <Navigate replace to="/" /> : <ResultsPage />}
          ></Route>
          <Route
            exact
            path="/results/:subjectId"
            element={
              !user ? <Navigate replace to="/" /> : <SubjectResultPage />
            }
          ></Route>
          <Route
            exact
            path="/results/:subjectId/details"
            element={
              !user ? <Navigate replace to="/" /> : <SubjectDetailsPage />
            }
          ></Route>
          <Route
            exact
            path="*"
            element={
              <h1 className="text-2xl font-bold pt-16 text-center ">
                Error: 404 | Page Not Found!
              </h1>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
