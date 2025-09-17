import type { Application, ApplicationStatus, Candidate, DashboardStats, Job, RoundFeedback } from "@/types/hr";


export const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    status: 'Active',
    description: 'We are looking for an experienced frontend developer to join our dynamic team.',
    requirements: ['React', 'TypeScript', 'Next.js', '5+ years experience'],
    salaryRange: {
      min: 120000,
      max: 180000,
      currency: 'USD'
    },
    postedDate: '2024-01-15',
    applicationDeadline: '2024-02-15',
    applicationsCount: 47
  },
  {
    id: 'job-2',
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    type: 'Full-time',
    status: 'Active',
    description: 'Join our product team to drive innovation and growth.',
    requirements: ['Product Management', 'Agile', 'Analytics', '3+ years experience'],
    salaryRange: {
      min: 110000,
      max: 150000,
      currency: 'USD'
    },
    postedDate: '2024-01-10',
    applicationDeadline: '2024-02-10',
    applicationsCount: 32
  },
  {
    id: 'job-3',
    title: 'UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    status: 'Active',
    description: 'Create amazing user experiences for our products.',
    requirements: ['Figma', 'User Research', 'Prototyping', '4+ years experience'],
    salaryRange: {
      min: 90000,
      max: 130000,
      currency: 'USD'
    },
    postedDate: '2024-01-20',
    applicationDeadline: '2024-02-20',
    applicationsCount: 28
  },
  {
    id: 'job-4',
    title: 'Data Scientist',
    department: 'Data',
    location: 'Austin, TX',
    type: 'Full-time',
    status: 'Closed',
    description: 'Analyze data to drive business decisions.',
    requirements: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
    salaryRange: {
      min: 130000,
      max: 170000,
      currency: 'USD'
    },
    postedDate: '2023-12-01',
    applicationDeadline: '2024-01-01',
    applicationsCount: 15
  }
];

export const mockCandidates: Candidate[] = [
  {
    id: 'candidate-1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-0123',
    location: 'San Francisco, CA',
    experience: 6,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    resumeUrl: '/resumes/john-smith.pdf',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    appliedJobs: ['job-1'],
    applications: [],
    overallRating: 4.5
  },
  {
    id: 'candidate-2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1-555-0124',
    location: 'New York, NY',
    experience: 4,
    skills: ['Product Strategy', 'Agile', 'Analytics', 'Leadership'],
    resumeUrl: '/resumes/sarah-johnson.pdf',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    appliedJobs: ['job-2'],
    applications: [],
    overallRating: 4.2
  },
  {
    id: 'candidate-3',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@email.com',
    phone: '+1-555-0125',
    location: 'Seattle, WA',
    experience: 5,
    skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
    resumeUrl: '/resumes/michael-chen.pdf',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    appliedJobs: ['job-3'],
    applications: [],
    overallRating: 4.7
  },
  {
    id: 'candidate-4',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@email.com',
    phone: '+1-555-0126',
    location: 'Austin, TX',
    experience: 3,
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
    resumeUrl: '/resumes/emily-davis.pdf',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    appliedJobs: ['job-4'],
    applications: [],
    overallRating: 4.0
  },
  {
    id: 'candidate-5',
    firstName: 'Alex',
    lastName: 'Rodriguez',
    email: 'alex.rodriguez@email.com',
    phone: '+1-555-0127',
    location: 'Remote',
    experience: 7,
    skills: ['React', 'Vue.js', 'Python', 'DevOps'],
    resumeUrl: '/resumes/alex-rodriguez.pdf',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    appliedJobs: ['job-1', 'job-3'],
    applications: [],
    overallRating: 4.3
  }
];

export const mockFeedback: RoundFeedback[] = [
  {
    id: 'feedback-1',
    round: 'Phone Screening',
    interviewer: 'Jane Smith',
    date: '2024-01-25',
    rating: 4,
    technicalSkills: 4,
    communicationSkills: 5,
    culturalFit: 4,
    comments: 'Strong technical background and excellent communication skills. Showed great enthusiasm for the role.',
    decision: 'Pass',
    nextSteps: 'Schedule technical interview'
  },
  {
    id: 'feedback-2',
    round: 'Technical Interview',
    interviewer: 'Bob Wilson',
    date: '2024-01-28',
    rating: 5,
    technicalSkills: 5,
    communicationSkills: 4,
    culturalFit: 5,
    comments: 'Exceptional problem-solving skills. Completed all coding challenges efficiently.',
    decision: 'Pass',
    nextSteps: 'Schedule final interview'
  }
];

export const mockApplications: Application[] = [
  {
    id: 'app-1',
    candidateId: 'candidate-1',
    jobId: 'job-1',
    status: 'Technical Interview',
    appliedDate: '2024-01-20',
    currentRound: 'Technical Interview',
    feedback: [mockFeedback[0]],
    overallScore: 4.2,
    nextActionDate: '2024-02-01',
    notes: 'Strong candidate, proceed to next round'
  },
  {
    id: 'app-2',
    candidateId: 'candidate-2',
    jobId: 'job-2',
    status: 'Final Interview',
    appliedDate: '2024-01-18',
    currentRound: 'Final Interview',
    feedback: [mockFeedback[0], mockFeedback[1]],
    overallScore: 4.5,
    nextActionDate: '2024-02-03',
    notes: 'Excellent candidate, strong fit for the role'
  },
  {
    id: 'app-3',
    candidateId: 'candidate-3',
    jobId: 'job-3',
    status: 'Phone Screening',
    appliedDate: '2024-01-22',
    currentRound: 'Phone Screening',
    feedback: [],
    nextActionDate: '2024-02-02'
  },
  {
    id: 'app-4',
    candidateId: 'candidate-4',
    jobId: 'job-4',
    status: 'Under Review',
    appliedDate: '2024-01-19',
    currentRound: 'Resume Review',
    feedback: []
  },
  {
    id: 'app-5',
    candidateId: 'candidate-5',
    jobId: 'job-1',
    status: 'Offer Extended',
    appliedDate: '2024-01-15',
    currentRound: 'Offer',
    feedback: [mockFeedback[0], mockFeedback[1]],
    overallScore: 4.8,
    nextActionDate: '2024-02-05',
    notes: 'Top candidate, offer extended'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalJobs: 15,
  activeJobs: 8,
  totalApplications: 127,
  todayApplications: 5,
  interviewsScheduled: 12,
  offersExtended: 3,
  applicationsThisWeek: 23,
  applicationsByStatus: [
    { status: 'Applied', count: 45 },
    { status: 'Under Review', count: 32 },
    { status: 'Phone Screening', count: 18 },
    { status: 'Technical Interview', count: 15 },
    { status: 'Final Interview', count: 8 },
    { status: 'Offer Extended', count: 5 },
    { status: 'Hired', count: 3 },
    { status: 'Rejected', count: 1 }
  ]
};

// Helper function to get applications by status
export const getApplicationsByStatus = (status: ApplicationStatus): Application[] => {
  return mockApplications.filter(app => app.status === status);
};

// Helper function to get candidate by ID
export const getCandidateById = (id: string): Candidate | undefined => {
  return mockCandidates.find(candidate => candidate.id === id);
};

// Helper function to get job by ID
export const getJobById = (id: string): Job | undefined => {
  return mockJobs.find(job => job.id === id);
};