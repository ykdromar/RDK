import styles from "./app.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, ExperimentPage } from "./pages";
function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/experiment" element={<ExperimentPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
