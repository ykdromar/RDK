import styles from "./app.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  ExperimentPage,
  ResultsPage,
  SubjectResultPage,
} from "./pages";
function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
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
