import "./App.css";
import { LandingPage } from "@/features/home/LandingPage";
import { Routes, Route } from "react-router-dom";
import { CandidatePage } from "@/features/candidate/CandidatePage";
import HRDashboard from "./app/page";
import ProfilePage from "./features/candidate/ProfilePage";
import { JobDetailsPage } from "./features/hr/JobDetailsPage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/candidate" element={<CandidatePage />} />
        <Route path="candidates/profile" element={<ProfilePage />} />
        <Route path="/hr" element={<HRDashboard />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
