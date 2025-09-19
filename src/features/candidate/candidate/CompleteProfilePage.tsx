import React, { useState, useEffect, useRef } from "react";
import { useProfileCompletion } from "./ProfileCompletionContext";
import { useUserProfile } from "./UserProfileContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Briefcase, User, Award, FolderOpen, DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";


import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

type StepField = { name: string; label: string; type: string };
type StepFields = StepField[];
type FormState = { [key: string]: any };

const stepFields: StepFields[] = [

  [
    { name: "fullName", label: "Full Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "text" },
    { name: "state", label: "State", type: "text" },
    { name: "city", label: "City", type: "text" },
  ],
  [
    { name: "experiences", label: "Work Experiences", type: "experiences" },
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


const sectionIcons = [
  <User className="w-6 h-6 text-accent" />,
  <Briefcase className="w-6 h-6 text-accent" />,
  <Award className="w-6 h-6 text-accent" />,
  <FolderOpen className="w-6 h-6 text-accent" />,
  <DollarSign className="w-6 h-6 text-accent" />
];

const sectionBg = [
  "bg-gradient-to-br from-blue-50 to-blue-100",
  "bg-gradient-to-br from-amber-50 to-yellow-100",
  "bg-gradient-to-br from-green-50 to-green-100",
  "bg-gradient-to-br from-purple-50 to-purple-100",
  "bg-gradient-to-br from-pink-50 to-pink-100"
];

const CompleteProfilePage: React.FC = () => {

  const { steps, saveStepData } = useProfileCompletion();
  const { profile } = useUserProfile();

  const isStepPrefilled = (fields: StepField[] | undefined, data: FormState) =>
    Array.isArray(fields) && fields.every((f) => data[f.name] && data[f.name].toString().trim() !== "");

  // State for add forms in Portfolio & Projects (must be after steps is defined)
  const [portfolioInputs, setPortfolioInputs] = useState<string[]>(() => Array(steps.length).fill(""));
  const [projectInputs, setProjectInputs] = useState<{ name: string; description: string; link: string; file: File | null }[]>(() => Array(steps.length).fill(null).map(() => ({ name: "", description: "", link: "", file: null })));

  const [formStates, setFormStates] = useState<FormState[]>(() => {
    return steps.map((step, idx) => {
      let data: FormState = {};
      if (idx === 0) {
        let city = "";
        let state = "";
        if (profile.location) {
          const parts = profile.location.split(",").map((s) => s.trim());
          if (parts.length >= 2) {
            city = parts[0];
            state = parts[1];
          }
        }
        data = {
          fullName: profile.name || "",
          email: profile.email || "",
          phone: profile.phone || "",
          state,
          city,
        };
      } else if (stepFields[idx] && stepFields[idx][0]?.type === "education") {
        data = {
          education: profile.education || "",
        };
      } else if (idx === 2 && profile.experience && profile.experience.length > 0) {
        data = {
          experiences: profile.experience.map((exp: any) => ({
            company: exp.company || "",
            role: exp.title || "",
            years: exp.years || ""
          }))
        };
      } else if (idx === 2) {
        data = { experiences: [] };
      } else if (idx === 3) {
        data = {
          skills: profile.skills ? profile.skills.join(", ") : "",
          certName: "",
          certFiles: [], // array of File
        };
      } else if (idx === 4) {
        data = {
          portfolioLinks: [], // array of string (URLs)
          projects: [], // array of { name: string, description: string }
        };
      } else if (idx === 5) {
        data = {
          preferredRole: profile.title || "",
          expectedSalary: "",
        };
      } else {
        data = step.data || {};
      }
      if (stepFields[idx] && isStepPrefilled(stepFields[idx], data)) {
        setTimeout(() => saveStepData(idx, data), 0);
      }
      return data;
    });
  });

  useEffect(() => {
    setFormStates((prev) =>
      prev.map((state, idx) => {
        const s = state as FormState;
        if (idx === 0) {
          let city = s.city || "";
          let stateVal = s.state || "";
          if ((!city || !stateVal) && profile.location) {
            const parts = profile.location.split(",").map((str) => str.trim());
            if (parts.length >= 2) {
              city = city || parts[0];
              stateVal = stateVal || parts[1];
            }
          }
          return {
            ...s,
            fullName: s.fullName || profile.name || "",
            email: s.email || profile.email || "",
            phone: s.phone || profile.phone || "",
            state: stateVal,
            city: city,
          };
        }
        if (idx === 1 && profile.experience && profile.experience.length > 0) {
          return {
            ...s,
            experiences: Array.isArray(s.experiences)
              ? s.experiences
              : profile.experience.map((exp: any) => ({
                  company: exp.company || "",
                  role: exp.title || "",
                  years: exp.years || ""
                })),
          };
        }
        if (idx === 1) {
          return {
            ...s,
            experiences: Array.isArray(s.experiences) ? s.experiences : [],
          };
        }
        if (idx === 2) {
          return {
            ...s,
            skills: s.skills || (profile.skills ? profile.skills.join(", ") : ""),
          };
        }
        if (idx === 4) {
          return {
            ...s,
            preferredRole: s.preferredRole || profile.title || "",
          };
        }
        return s;
      })
    );
  }, [profile]);

  // Calculate completed steps based on whether all required fields are filled in formStates
  const completedSteps = formStates.filter((state, idx) =>
    Array.isArray(stepFields[idx]) && stepFields[idx].every((f) => {
      if (idx === 2 && f.type === "experiences") {
        return Array.isArray(state.experiences) && state.experiences.length > 0 && state.experiences.every((exp: any) => exp.company && exp.role && exp.years);
      }
      const val = state[f.name];
      if (Array.isArray(val)) return val.length > 0;
      if (typeof val === 'object' && val !== null && f.type === 'projects') {
        return Array.isArray(val) ? val.length > 0 : false;
      }
      return val !== undefined && val !== null && val.toString().trim() !== "";
    })
  ).length;
  // Work Experience handlers
  const [workExpInput, setWorkExpInput] = useState({ company: "", role: "", years: "" });
  const handleWorkExpInputChange = (field: string, value: string) => {
    setWorkExpInput((prev) => ({ ...prev, [field]: value }));
  };
  const handleAddWorkExperience = () => {
    if (!workExpInput.company.trim() || !workExpInput.role.trim() || !workExpInput.years.trim()) return;
    setFormStates((prev) => {
      const updated = [...prev];
      const exps = Array.isArray(updated[1].experiences) ? [...updated[1].experiences] : [];
      exps.push({ ...workExpInput });
      updated[1] = { ...updated[1], experiences: exps };
      return updated;
    });
    setWorkExpInput({ company: "", role: "", years: "" });
  };
  const handleRemoveWorkExperience = (idx: number) => {
    setFormStates((prev) => {
      const updated = [...prev];
      const exps = Array.isArray(updated[1].experiences) ? [...updated[1].experiences] : [];
      exps.splice(idx, 1);
      updated[1] = { ...updated[1], experiences: exps };
      return updated;
    });
  };

  const completionPercentage = (completedSteps / steps.length) * 100;

  // State for profile completion dialog (must be after steps/completedSteps)
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  // Track if all steps were already completed on mount (to avoid showing dialog on load)
  const wasAllCompleted = useRef(completedSteps === steps.length && steps.length > 0);
  // Track the last saved step index
  const lastSavedStep = useRef<number | null>(null);

  // Show dialog only after user saves the last step and all steps in context are completed
  useEffect(() => {
    const allStepsCompleted = steps.every((step) => step.completed);
    if (
      allStepsCompleted &&
      steps.length > 0 &&
      lastSavedStep.current === steps.length - 1 &&
      !wasAllCompleted.current
    ) {
      setShowCompletionDialog(true);
      wasAllCompleted.current = true;
    } else if (!allStepsCompleted) {
      wasAllCompleted.current = false;
    }
  }, [steps]);

  // Patch handleSave to track the last saved step
  const handleSave = (stepIdx: number) => {
    saveStepData(stepIdx, formStates[stepIdx]);
    setEditModes((prev) => {
      const updated = [...prev];
      updated[stepIdx] = false;
      return updated;
    });
    lastSavedStep.current = stepIdx;
  };

  const allSkills = [
    "React", "TypeScript", "JavaScript", "Next.js", "Node.js", "HTML", "CSS",
    "Tailwind CSS", "Redux", "GraphQL", "Figma", "Python", "Java", "C++", "SQL",
    "AWS", "Docker", "Kubernetes",
  ];

  const handleSkillAdd = (stepIdx: number, skill: string) => {
    setFormStates((prev) => {
      const updated = [...prev];
      const currentSkills = (updated[stepIdx].skills
        ? updated[stepIdx].skills.split(", ")
        : []
      ).filter(Boolean);
      if (!currentSkills.includes(skill)) {
        updated[stepIdx] = {
          ...updated[stepIdx],
          skills: [...currentSkills, skill].join(", "),
        };
      }
      return updated;
    });
  };

  const handleSkillRemove = (stepIdx: number, skill: string) => {
    setFormStates((prev) => {
      const updated = [...prev];
      const currentSkills = (updated[stepIdx].skills
        ? updated[stepIdx].skills.split(", ")
        : []
      ).filter(Boolean);
    updated[stepIdx] = {
      ...updated[stepIdx],
      skills: currentSkills.filter((s: string) => s !== skill).join(", "),
    };
      return updated;
    });
  };

  // Handle change for normal fields and certFiles (multiple)
  const handleChange = (stepIdx: number, field: string, value: any) => {
    setFormStates((prev) => {
      const updated = [...prev];
      if (field === "certFiles") {
        // Multiple file upload
        const files = Array.from(value.target.files || []);
        updated[stepIdx] = {
          ...updated[stepIdx],
          certFiles: [...(updated[stepIdx].certFiles || []), ...files],
        };
      } else {
        updated[stepIdx] = { ...updated[stepIdx], [field]: value };
      }
      return updated;
    });
  };

  // Portfolio Links handlers
  const handlePortfolioInputChange = (stepIdx: number, value: string) => {
    setPortfolioInputs((prev) => {
      const updated = [...prev];
      updated[stepIdx] = value;
      return updated;
    });
  };
  const handleAddPortfolioLink = (stepIdx: number) => {
    const link = portfolioInputs[stepIdx].trim();
    if (!link) return;
    setFormStates((prev) => {
      const updated = [...prev];
      const links = Array.isArray(updated[stepIdx].portfolioLinks) ? [...updated[stepIdx].portfolioLinks] : [];
      links.push(link);
      updated[stepIdx] = { ...updated[stepIdx], portfolioLinks: links };
      return updated;
    });
    setPortfolioInputs((prev) => {
      const updated = [...prev];
      updated[stepIdx] = "";
      return updated;
    });
  };
  const handleRemovePortfolioLink = (stepIdx: number, linkIdx: number) => {
    setFormStates((prev) => {
      const updated = [...prev];
      const links = Array.isArray(updated[stepIdx].portfolioLinks) ? [...updated[stepIdx].portfolioLinks] : [];
      links.splice(linkIdx, 1);
      updated[stepIdx] = { ...updated[stepIdx], portfolioLinks: links };
      return updated;
    });
  };

  // Projects handlers
  const handleProjectInputChange = (stepIdx: number, field: "name" | "description" | "link", value: string) => {
    setProjectInputs((prev) => {
      const updated = [...prev];
      updated[stepIdx] = { ...updated[stepIdx], [field]: value };
      return updated;
    });
  };
  const handleProjectFileChange = (stepIdx: number, file: File | null) => {
    setProjectInputs((prev) => {
      const updated = [...prev];
      updated[stepIdx] = { ...updated[stepIdx], file };
      return updated;
    });
  };
  const handleAddProject = (stepIdx: number) => {
    const { name, description, link, file } = projectInputs[stepIdx];
    if (!name.trim() || !description.trim()) return;
    setFormStates((prev) => {
      const updated = [...prev];
      const projects = Array.isArray(updated[stepIdx].projects) ? [...updated[stepIdx].projects] : [];
      projects.push({ name: name.trim(), description: description.trim(), link: link.trim(), file });
      updated[stepIdx] = { ...updated[stepIdx], projects };
      return updated;
    });
    setProjectInputs((prev) => {
      const updated = [...prev];
      updated[stepIdx] = { name: "", description: "", link: "", file: null };
      return updated;
    });
  };
  const handleRemoveProject = (stepIdx: number, projIdx: number) => {
    setFormStates((prev) => {
      const updated = [...prev];
      const projects = Array.isArray(updated[stepIdx].projects) ? [...updated[stepIdx].projects] : [];
      projects.splice(projIdx, 1);
      updated[stepIdx] = { ...updated[stepIdx], projects };
      return updated;
    });
  };

  // Remove a certificate file from the list
  const handleRemoveCertFile = (stepIdx: number, fileIdx: number) => {
    setFormStates((prev) => {
      const updated = [...prev];
      const files = Array.isArray(updated[stepIdx].certFiles) ? [...updated[stepIdx].certFiles] : [];
      files.splice(fileIdx, 1);
      updated[stepIdx] = { ...updated[stepIdx], certFiles: files };
      return updated;
    });
  };

  const [editModes, setEditModes] = useState<boolean[]>(steps.map(() => false));

  const isStepFilled = (fields: StepField[] | undefined, data: FormState) =>
    Array.isArray(fields) && fields.every(
      (f) =>
        data[f.name] !== undefined &&
        data[f.name] !== null &&
        data[f.name].toString().trim() !== ""
    );



  const handleEdit = (stepIdx: number) => {
    setEditModes((prev) => {
      const updated = [...prev];
      updated[stepIdx] = true;
      return updated;
    });
  };

  return (
    <>
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent showCloseButton>
          <DialogTitle>🎉 Profile Completed!</DialogTitle>
          <DialogDescription>
            Congratulations! You have completed your profile. You're now ready to get matched with the best jobs. Keep your profile updated for the best opportunities.
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setShowCompletionDialog(false)} autoFocus>Awesome!</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white flex flex-col">
  <header className="w-full bg-white/80 shadow-md py-10 px-4 md:px-0 flex flex-col items-center">
        <h2 className="text-4xl font-extrabold mb-2 text-foreground tracking-tight flex items-center gap-2">
          Complete Your Profile
        </h2>
        <p className="text-muted-foreground text-lg mb-6 text-center max-w-2xl">
          Fill out each section below to maximize your chances of getting matched with the best jobs.<br />
          <span className="text-accent font-semibold">Your progress will update as you save each section.</span>
        </p>
        <div className="w-full max-w-2xl flex flex-col gap-2 mb-6">
          <div className="flex justify-between text-sm font-medium">
            <span>Progress</span>
            <span>
              {completedSteps}/{steps.length} steps completed
            </span>
          </div>
          <Progress value={completionPercentage} className="h-3 rounded-full shadow-inner" />
        </div>
        <div className="w-full max-w-2xl flex justify-between gap-2 mb-8">
          {steps.map((step, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center group">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold shadow-lg border-2 transition-all duration-200 ${
                  step.completed ? "bg-accent border-accent text-white scale-110" : "bg-muted-foreground/10 border-muted-foreground/20 text-muted-foreground"
                } group-hover:scale-105`}
              >
                {idx + 1}
              </div>
              <span
                className={`text-xs mt-2 text-center ${
                  step.completed ? "text-accent font-semibold" : "text-muted-foreground"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center w-full">
        <div className="w-full max-w-7xl py-12 px-2 md:px-16 space-y-14">
          {steps.map((step, idx) => (
            <Card
              key={idx}
              className={`transition-all duration-200 shadow-xl border-0 max-w-7xl mx-auto hover:scale-[1.015] ${sectionBg[idx]} bg-opacity-80 backdrop-blur-md`}
              style={{ boxShadow: step.completed ? '0 4px 32px 0 rgba(16, 185, 129, 0.15)' : undefined }}
            >
              <CardHeader className="rounded-t-xl border-b border-muted/30 flex flex-row items-center gap-3 bg-white/60">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-accent/10 text-accent shadow">
                    {sectionIcons[idx]}
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground tracking-tight">
                    {step.title}
                  </CardTitle>
                </div>
                {step.completed && !editModes[idx] && (
                  <span className="text-xs text-green-600 ml-2 font-semibold bg-green-100 px-2 py-1 rounded-full">Saved</span>
                )}
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSave(idx);
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stepFields[idx].map((field) => {
                      // Work Experience (custom UI)
                      if (idx === 1 && field.type === "experiences") {
                        const experiences = formStates[1].experiences || [];
                        return (
                          <div key={field.name} className="flex flex-col gap-2">
                            {/* Only keep the section label in the CardTitle above, remove this label for clarity */}
                            <div className="flex gap-2 mb-2">
                              <input
                                type="text"
                                placeholder="Company"
                                value={workExpInput.company}
                                onChange={e => handleWorkExpInputChange("company", e.target.value)}
                                className="border border-muted rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white flex-1"
                                disabled={!editModes[1]}
                              />
                              <input
                                type="text"
                                placeholder="Role"
                                value={workExpInput.role}
                                onChange={e => handleWorkExpInputChange("role", e.target.value)}
                                className="border border-muted rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white flex-1"
                                disabled={!editModes[1]}
                              />
                              <input
                                type="number"
                                placeholder="Years"
                                value={workExpInput.years}
                                onChange={e => handleWorkExpInputChange("years", e.target.value)}
                                className="border border-muted rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white w-24"
                                disabled={!editModes[1]}
                              />
                              <Button type="button" size="sm" onClick={handleAddWorkExperience} disabled={!editModes[1] || !workExpInput.company.trim() || !workExpInput.role.trim() || !workExpInput.years.trim()}>
                                Add
                              </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {experiences.map((exp: any, expIdx: number) => (
                                <Badge key={expIdx} variant="secondary" className="flex items-center gap-1 pr-1">
                                  <span className="font-semibold text-xs">{exp.company}</span>
                                  <span className="text-xs">{exp.role}</span>
                                  <span className="text-xs">{exp.years} yrs</span>
                                  {editModes[1] && (
                                    <button type="button" className="ml-1 text-muted-foreground hover:text-destructive focus:outline-none" onClick={() => handleRemoveWorkExperience(expIdx)} tabIndex={-1}>
                                      <X className="w-3 h-3" />
                                    </button>
                                  )}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      // Skills (custom UI)
                      if (idx === 2 && field.name === "skills") {
                        const selectedSkills = (formStates[idx].skills
                          ? formStates[idx].skills.split(", ")
                          : []
                        ).filter(Boolean);
                        return (
                          <div key={field.name} className="flex flex-col gap-1">
                            <label htmlFor={`${field.name}-${idx}`} className="text-sm font-medium text-foreground">{field.label}</label>
                            <select
                              id={`${field.name}-${idx}`}
                              className="border border-muted rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                              disabled={!editModes[idx]}
                              value=""
                              onChange={(e) => {
                                if (e.target.value) handleSkillAdd(idx, e.target.value);
                              }}
                            >
                              <option value="" disabled>
                                {selectedSkills.length ? "Add another skill" : "Select a skill"}
                              </option>
                              {allSkills.filter((skill) => !selectedSkills.includes(skill)).map((skill) => (
                                <option key={skill} value={skill}>{skill}</option>
                              ))}
                            </select>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {selectedSkills.map((skill: string) => (
                                <Badge key={skill} variant="secondary" className="flex items-center gap-1 pr-1">
                                  {skill}
                                  {editModes[idx] && (
                                    <button type="button" className="ml-1 text-muted-foreground hover:text-destructive focus:outline-none" onClick={() => handleSkillRemove(idx, skill)} tabIndex={-1}>
                                      <X className="w-3 h-3" />
                                    </button>
                                  )}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      // Certificates (custom UI)
                      if (idx === 2 && field.type === "file") {
                        const certFiles: File[] = formStates[idx].certFiles || [];
                        return (
                          <div key={field.name} className="flex flex-col gap-1">
                            <label htmlFor={`${field.name}-${idx}`} className="text-sm font-medium text-foreground">{field.label}</label>
                            <input
                              id={`${field.name}-${idx}`}
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              multiple
                              onChange={(e) => handleChange(idx, field.name, e)}
                              className="border border-muted rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                              disabled={!editModes[idx]}
                            />
                            {certFiles.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {certFiles.map((file, fileIdx) => (
                                  <Badge key={fileIdx} variant="secondary" className="flex items-center gap-1 pr-1">
                                    {file.name}
                                    {editModes[idx] && (
                                      <button type="button" className="ml-1 text-muted-foreground hover:text-destructive focus:outline-none" onClick={() => handleRemoveCertFile(idx, fileIdx)} tabIndex={-1}>
                                        <X className="w-3 h-3" />
                                      </button>
                                    )}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }
                      // Portfolio Links (custom UI)
                      if (idx === 3 && field.name === "portfolioLinks") {
                        const links: string[] = formStates[idx].portfolioLinks || [];
                        return (
                          <div key={field.name} className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-foreground">Portfolio Links</label>
                            <div className="flex gap-2 mb-2">
                              <input
                                type="url"
                                placeholder="Add portfolio link"
                                value={portfolioInputs[idx]}
                                onChange={e => handlePortfolioInputChange(idx, e.target.value)}
                                className="border border-muted rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white flex-1"
                                disabled={!editModes[idx]}
                              />
                              <Button type="button" size="sm" onClick={() => handleAddPortfolioLink(idx)} disabled={!editModes[idx] || !portfolioInputs[idx].trim()}>
                                Add
                              </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {links.map((link, linkIdx) => (
                                <Badge key={linkIdx} variant="secondary" className="flex items-center gap-1 pr-1">
                                  <a href={link} target="_blank" rel="noopener noreferrer" className="underline text-xs">{link}</a>
                                  {editModes[idx] && (
                                    <button type="button" className="ml-1 text-muted-foreground hover:text-destructive focus:outline-none" onClick={() => handleRemovePortfolioLink(idx, linkIdx)} tabIndex={-1}>
                                      <X className="w-3 h-3" />
                                    </button>
                                  )}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      // Projects (custom UI)
                      if (idx === 3 && field.name === "projects") {
                        const projects: { name: string; description: string; link?: string; file?: File | null }[] = formStates[idx].projects || [];
                        return (
                          <div key={field.name} className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-foreground">Projects & Work Samples</label>
                            <div className="flex flex-col md:flex-row gap-2 mb-2">
                              <input
                                type="text"
                                placeholder="Project Name"
                                value={projectInputs[idx].name}
                                onChange={e => handleProjectInputChange(idx, "name", e.target.value)}
                                className="border border-muted rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white flex-1"
                                disabled={!editModes[idx]}
                              />
                              <input
                                type="text"
                                placeholder="Project Description"
                                value={projectInputs[idx].description}
                                onChange={e => handleProjectInputChange(idx, "description", e.target.value)}
                                className="border border-muted rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white flex-1"
                                disabled={!editModes[idx]}
                              />
                            </div>
                            <div className="flex flex-col md:flex-row gap-2 mb-2">
                              <input
                                type="url"
                                placeholder="Project Link (GitHub, Behance, etc.)"
                                value={projectInputs[idx].link}
                                onChange={e => handleProjectInputChange(idx, "link", e.target.value)}
                                className="border border-muted rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white flex-1"
                                disabled={!editModes[idx]}
                              />
                              <input
                                type="file"
                                placeholder="Upload work sample (optional)"
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.zip"
                                onChange={e => handleProjectFileChange(idx, e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                                className="border border-muted rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white flex-1"
                                disabled={!editModes[idx]}
                              />
                              <Button type="button" size="sm" onClick={() => handleAddProject(idx)} disabled={!editModes[idx] || !projectInputs[idx].name.trim() || !projectInputs[idx].description.trim()}>
                                Add
                              </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {projects.map((proj, projIdx) => (
                                <Badge key={projIdx} variant="secondary" className="flex items-center gap-1 pr-1">
                                  <span className="font-semibold text-xs">{proj.name}:</span> <span className="text-xs">{proj.description}</span>
                                  {proj.link && (
                                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="underline text-xs ml-1">Link</a>
                                  )}
                                  {proj.file && (
                                    <a
                                      href={URL.createObjectURL(proj.file)}
                                      download={proj.file.name}
                                      className="underline text-xs ml-1"
                                      onClick={e => e.stopPropagation()}
                                    >
                                      File
                                    </a>
                                  )}
                                  {editModes[idx] && (
                                    <button type="button" className="ml-1 text-muted-foreground hover:text-destructive focus:outline-none" onClick={() => handleRemoveProject(idx, projIdx)} tabIndex={-1}>
                                      <X className="w-3 h-3" />
                                    </button>
                                  )}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      // Default input for other fields
                      return (
                        <div key={field.name} className="flex flex-col gap-1">
                          <label htmlFor={`${field.name}-${idx}`} className="text-sm font-medium text-foreground">{field.label}</label>
                          <input
                            id={`${field.name}-${idx}`}
                            type={field.type}
                            value={(formStates[idx] as FormState)[field.name] || ""}
                            onChange={e => handleChange(idx, field.name, e.target.value)}
                            className="border border-accent/30 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/60 bg-white shadow-sm transition-all duration-150 focus:border-accent"
                            required={false}
                            disabled={!editModes[idx]}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex gap-3 mt-6 justify-start">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="rounded-full px-5 font-semibold shadow"
                      onClick={() => handleEdit(idx)}
                      disabled={editModes[idx]}
                    >
                      Edit
                    </Button>
                    <Button
                      type="submit"
                      variant="default"
                      size="sm"
                      className="rounded-full px-6 font-bold shadow"
                      disabled={
                        !editModes[idx] ||
                        !isStepFilled(stepFields[idx], formStates[idx] as FormState)
                      }
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
    </>
  );
};


export default CompleteProfilePage;
