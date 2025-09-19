
import React, { createContext, useContext, useState } from "react";
import { useUserProfile } from "./UserProfileContext";


export type ProfileStep = {
  title: string;
  completed: boolean;
  data: any;
};

export const useProfileCompletion = () => {
  const ctx = useContext(ProfileCompletionContext);
  if (!ctx) throw new Error("useProfileCompletion must be used within ProfileCompletionProvider");
  return ctx;
};




interface ProfileCompletionContextType {
  steps: ProfileStep[];
  saveStepData: (index: number, data: any) => void;
}

const ProfileCompletionContext = createContext<ProfileCompletionContextType | undefined>(undefined);

type ProfileCompletionProviderProps = {
  children: React.ReactNode;
};

export const ProfileCompletionProvider: React.FC<ProfileCompletionProviderProps> = ({ children }) => {
  const { profile } = useUserProfile();

  const stepFields = [
    [
      { name: "fullName", label: "Full Name", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "state", label: "State", type: "text" },
      { name: "city", label: "City", type: "text" },
    ],
    [
      { name: "company", label: "Company", type: "text" },
      { name: "role", label: "Role", type: "text" },
      { name: "years", label: "Years of Experience", type: "number" },
    ],
    [
      { name: "skills", label: "Skills", type: "text" },
      { name: "certName", label: "Certifications", type: "text" },
      { name: "certFiles", label: "Upload Certificates", type: "file" },
    ],
    [
      { name: "portfolioLinks", label: "Portfolio Links", type: "portfolioLinks" },
      { name: "projects", label: "Projects", type: "projects" },
    ],
    [
      { name: "preferredRole", label: "Preferred Role", type: "text" },
      { name: "expectedSalary", label: "Expected Salary", type: "number" },
    ],
  ];

  // Helper to split location
  const getCityState = (location: string) => {
    if (!location) return { city: "", state: "" };
    const parts = location.split(",").map((s: string) => s.trim());
    return {
      city: parts[0] || "",
      state: parts[1] || "",
    };
  };

  // Helper to check if all required fields are filled
  const isStepComplete = (data: any, idx: number) => {
    const fields = stepFields[idx];
    if (!fields) return false;
    return fields.every((f: any) => {
      const val = data[f.name];
      if (Array.isArray(val)) return val.length > 0;
      if (typeof val === 'object' && val !== null && f.type === 'projects') {
        return Array.isArray(val) ? val.length > 0 : false;
      }
      return val !== undefined && val !== null && val.toString().trim() !== "";
    });
  };

  // Prefill step data from profile
  const initialSteps: ProfileStep[] = [
    {
      title: "Basic Information",
      data: {
        fullName: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        ...getCityState(profile.location),
      },
      completed: false,
    },
    {
      title: "Work Experience",
      data: {
        company: profile.experience?.[0]?.company || "",
        role: profile.experience?.[0]?.title || "",
        years: "",
      },
      completed: false,
    },
    {
      title: "Skills & Certifications",
      data: {
        skills: profile.skills ? profile.skills.join(", ") : "",
        certName: "",
        certFiles: [],
      },
      completed: false,
    },
    {
      title: "Portfolio & Projects",
      data: {
        portfolioLinks: [],
        projects: [],
      },
      completed: false,
    },
    {
      title: "Preferences & Salary",
      data: {
        preferredRole: profile.title || "",
        expectedSalary: "",
      },
      completed: false,
    },
  ];

  const [steps, setSteps] = useState<ProfileStep[]>(() =>
    initialSteps.map((step, idx) => ({ ...step, completed: isStepComplete(step.data, idx) }))
  );

  const saveStepData = (index: number, data: any) => {
    setSteps((prev) =>
      prev.map((step, i) =>
        i === index
          ? { ...step, data, completed: isStepComplete(data, i) }
          : step
      )
    );
  };

  return (
    <ProfileCompletionContext.Provider value={{ steps, saveStepData }}>
      {children}
    </ProfileCompletionContext.Provider>
  );
};
