import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, ArrowRight } from "lucide-react";
import { useProfileCompletion } from "./ProfileCompletionContext";
import { useNavigate } from "react-router-dom";


// Step fields must match CompleteProfilePage
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


export const ProfileCompletionCard = () => {
  const { steps } = useProfileCompletion();
  const navigate = useNavigate();
  // Only consider steps that have a corresponding stepFields definition
  const totalSteps = Math.min(steps.length, stepFields.length);
  // Helper to check if a step is actually complete (all required fields filled)
  const isStepComplete = (step: any, idx: number) => {
    const fields = stepFields[idx];
    if (!fields) return false;
    const data = step.data || {};
    return fields.every((f) => {
      const val = data[f.name];
      if (Array.isArray(val)) return val.length > 0;
      if (typeof val === 'object' && val !== null && f.type === 'projects') {
        return Array.isArray(val) ? val.length > 0 : false;
      }
      return val !== undefined && val !== null && val.toString().trim() !== "";
    });
  };
  const completedSteps = steps.slice(0, totalSteps).filter(isStepComplete).length;
  const completionPercentage = totalSteps > 0 ? Math.floor((completedSteps / totalSteps) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Profile Completion
          <span className="text-sm font-normal text-muted-foreground">
            {completedSteps}/{steps.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">
              {Math.round(completionPercentage)}%
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>

        <div className="space-y-3">
          {steps.slice(0, totalSteps).map((step, index) => (
            <div key={index} className="flex items-center space-x-3">
              {isStepComplete(step, index) ? (
                <CheckCircle className="w-5 h-5 text-accent" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground" />
              )}
              <span
                className={`text-sm ${
                  isStepComplete(step, index) ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        <Button
          className="w-full bg-transparent"
          variant="outline"
          onClick={() => navigate("/candidate/complete-profile")}
        >
          Complete Profile
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};
