import "./App.css";
import { LandingPage } from "@/features/home/LandingPage";
import { Routes, Route } from "react-router-dom";
import { CandidatePage } from "@/features/candidate/CandidatePage";
import HRDashboard from "./app/page";
import ProfilePage from "./features/candidate/ProfilePage";
import { JobDetailsPage } from "./features/hr/JobDetailsPage";
import JobsPage from "./app/jobs/page";
import InterviewsPage from "./app/interviews/page";
import HRCandidatesPage from "./app/candidates/page";
import RecommendationsPage from "./app/recommendations/page";
import NewJobPage from "./app/jobs/new/page";
import CandidateDetailPage from "./app/candidates/[id]/page";
import InterviewFeedbackPage from "./app/interviews/feedback/[id]/page";
import { VideoCallPage } from "./app/interviews/VideoCallPage";
import { SignInPage } from "./features/Authentication/SignInPage";
import { SignUpPage } from "./features/Authentication/SignUpPage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/candidate" element={<CandidatePage />} />
        <Route path="candidates/profile" element={<ProfilePage />} />
        <Route path="/hr" element={<HRDashboard />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
        <Route path="/hr/jobs" element={<JobsPage />} />
        <Route path="/hr/viewprofile" element={<CandidateDetailPage />} />
        <Route path="/interviews/feedback" element={<InterviewFeedbackPage />} />
        <Route path="/hr/newjob" element={<NewJobPage />} />
        <Route path="/hr/candidates" element={<HRCandidatesPage/>} />
        <Route path="/hr/interviews" element={<InterviewsPage />} />
        <Route path="/hr/reports" element={<RecommendationsPage />} />
         <Route path="/interviews/call/:id" element={<VideoCallPage />} />
      </Routes>
    </>
  );
}

export default App;
