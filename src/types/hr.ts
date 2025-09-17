export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  status: 'Active' | 'Closed' | 'Draft';
  description: string;
  requirements: string[];
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  postedDate: string;
  applicationDeadline: string;
  applicationsCount: number;
}

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  experience: number;
  skills: string[];
  resumeUrl: string;
  profileImage?: string;
  appliedJobs: string[];
  applications: Application[];
  overallRating?: number;
}

export interface Application {
  id: string;
  candidateId: string;
  jobId: string;
  status: ApplicationStatus;
  appliedDate: string;
  currentRound: string;
  feedback: RoundFeedback[];
  overallScore?: number;
  nextActionDate?: string;
  notes?: string;
}

export type ApplicationStatus = 
  | 'Applied'
  | 'Under Review'
  | 'Phone Screening'
  | 'Technical Interview'
  | 'Final Interview'
  | 'Offer Extended'
  | 'Hired'
  | 'Rejected'
  | 'Withdrawn';

export interface RoundFeedback {
  id: string;
  round: string;
  interviewer: string;
  date: string;
  rating: number; // 1-5
  technicalSkills?: number;
  communicationSkills?: number;
  culturalFit?: number;
  comments: string;
  decision: 'Pass' | 'Fail' | 'Hold';
  nextSteps?: string;
}

export interface HRUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'HR Manager' | 'Recruiter' | 'HR Admin';
  department: string;
  permissions: string[];
}

export interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  todayApplications: number;
  interviewsScheduled: number;
  offersExtended: number;
  applicationsThisWeek: number;
  applicationsByStatus: {
    status: ApplicationStatus;
    count: number;
  }[];
}