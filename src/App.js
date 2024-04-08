import styles from "./app.module.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  HomePage,
  ExperimentPage,
  ResultsPage,
  SubjectResultPage,
  LoginPage,
} from "./pages";
import { Navbar } from "./components/Navbar";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { firebaseGetUser } from "./config/firebaseAuth";
import { Loader } from "./components/Loader";
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
          <Route exact path="/experiment" element={<ExperimentPage />}></Route>
          <Route exact path="/results" element={<ResultsPage />}></Route>
          <Route
            exact
            path="/results/:subjectId"
            element={<SubjectResultPage />}
          ></Route>
          <Route
            exact
            path="*"
            element={<h1 className="text-2xl font-bold">404</h1>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
