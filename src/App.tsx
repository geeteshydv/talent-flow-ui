import "./App.css";
import { LandingPage } from "@/features/home/LandingPage";
import { Routes, Route } from "react-router-dom";
import { CandidatePage } from "@/features/candidate/CandidatePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/candidate" element={<CandidatePage />} />
      </Routes>
    </>
  );
}

export default App;
