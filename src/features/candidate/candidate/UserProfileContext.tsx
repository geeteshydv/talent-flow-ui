import React, { createContext, useContext, useState } from "react";

export interface UserProfile {
  name: string;
  title: string;
  avatarUrl: string;
  email: string;
  phone: string;
  location: string;
  about: string;
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    period: string;
  }>;
}

const defaultProfile: UserProfile = {
  name: "Sarah Johnson",
  title: "Senior Frontend Developer",
  avatarUrl: "https://github.com/shadcn.png",
  email: "sarah.j@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  about:
    "I am a passionate Senior Frontend Developer with over 8 years of experience in creating dynamic, responsive, and user-friendly web applications. My expertise lies in the React ecosystem, including Next.js and TypeScript. I thrive in collaborative environments and am always eager to learn new technologies to build better products.",
  skills: [
    "React",
    "TypeScript",
    "Next.js",
    "JavaScript (ES6+)",
    "HTML5 & CSS3",
    "Tailwind CSS",
    "Node.js",
    "GraphQL",
    "Figma",
  ],
  experience: [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      period: "Jan 2021 - Present",
      description:
        "Led the development of a new customer-facing dashboard using Next.js and TypeScript, improving user engagement by 25%. Mentored junior developers and established best practices for code reviews and testing.",
    },
    {
      title: "Frontend Developer",
      company: "Innovate Solutions",
      period: "Jun 2018 - Dec 2020",
      description:
        "Developed and maintained components for a large-scale e-commerce platform using React and Redux. Collaborated with UX/UI designers to translate mockups into high-quality code.",
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California, Berkeley",
      period: "Sep 2014 - May 2018",
    },
  ],
};

interface UserProfileContextType {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const useUserProfile = () => {
  const ctx = useContext(UserProfileContext);
  if (!ctx) throw new Error("useUserProfile must be used within UserProfileProvider");
  return ctx;
};

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  return (
    <UserProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};
