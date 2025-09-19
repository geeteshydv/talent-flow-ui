// Feedback interface for candidate feedbacks from HRs
export interface CandidateFeedback {
  id: string; // Unique feedback ID
  candidateId: string; // Candidate ID
  hrName: string;
  hrEmail?: string;
  rating?: number; // Optional rating (1-5)
  comments: string;
  date: string; // ISO date string
  role?: string; // Role for which feedback is given
}

// Example mock feedbacks for a candidate
export const mockCandidateFeedbacks: CandidateFeedback[] = [
  {
    id: "f1",
    candidateId: "c123",
    hrName: "Priya Sharma",
    hrEmail: "priya.hr@company.com",
    rating: 4,
    comments: "Strong communication skills and quick learner. Recommended for frontend roles.",
    date: "2025-09-10",
    role: "Frontend Developer",
  },
  {
    id: "f2",
    candidateId: "c123",
    hrName: "Amit Verma",
    hrEmail: "amit.hr@company.com",
    rating: 5,
    comments: "Excellent technical knowledge. Impressed with React and TypeScript expertise.",
    date: "2025-09-12",
    role: "React Engineer",
  },
  {
    id: "f3",
    candidateId: "c123",
    hrName: "Neha Singh",
    hrEmail: "neha.hr@company.com",
    rating: 3,
    comments: "Good overall, but needs improvement in problem-solving under pressure.",
    date: "2025-09-15",
    role: "Full Stack Developer",
  },
  {
    id: "f4",
    candidateId: "c123",
    hrName: "Rohit Agarwal",
    hrEmail: "rohit.hr@company.com",
    rating: 5,
    comments: "Outstanding leadership and project management skills. Highly recommended for senior roles.",
    date: "2025-09-18",
    role: "Tech Lead",
  },
  {
    id: "f5",
    candidateId: "c123",
    hrName: "Meera Patel",
    hrEmail: "meera.hr@company.com",
    rating: 4,
    comments: "Very creative and detail-oriented. Great fit for UI/UX positions.",
    date: "2025-09-19",
    role: "UI/UX Designer",
  },
  {
    id: "f6",
    candidateId: "c123",
    hrName: "Suresh Kumar",
    hrEmail: "suresh.hr@company.com",
    rating: 2,
    comments: "Needs to improve time management and meet deadlines more consistently.",
    date: "2025-09-20",
    role: "Backend Developer",
  },
];
