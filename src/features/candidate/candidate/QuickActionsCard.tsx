import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, FileText, User, Settings } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import React, { useState, useRef } from "react"

const quickActions = [
  {
    title: "Browse Jobs",
    description: "Find new opportunities",
    icon: Search,
    action: "browse",
  },
  {
    title: "Update Resume",
    description: "Keep your profile current",
    icon: FileText,
    action: "resume",
  },
  {
    title: "Edit Profile",
    description: "Manage your information",
    icon: User,
    action: "profile",
  },
  {
    title: "Job Preferences",
    description: "Update your criteria",
    icon: Settings,
    action: "preferences",
  },
];

const QuickActionsCard: React.FC = () => {
  const navigate = useNavigate();
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleResumeClick = () => setResumeModalOpen(true);
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setResumeFile(e.dataTransfer.files[0]);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };
  const handleAreaClick = () => fileInputRef.current?.click();
  const handleModalClose = () => {
    setResumeModalOpen(false);
    setResumeFile(null);
  };

  return (
    <>
      <Dialog open={resumeModalOpen} onOpenChange={setResumeModalOpen}>
        <DialogContent showCloseButton>
          <DialogHeader>
            <DialogTitle>Update Resume</DialogTitle>
            <DialogDescription>
              Drag and drop your resume file here, or click to select a file.<br />
              Accepted formats: PDF, DOC, DOCX
            </DialogDescription>
          </DialogHeader>
          <div
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            onClick={handleAreaClick}
            className="border-2 border-dashed border-accent rounded-lg p-6 text-center cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
            style={{ minHeight: 120 }}
          >
            {resumeFile ? (
              <div className="flex flex-col items-center gap-4">
                <div className="text-foreground font-medium">{resumeFile.name}</div>
                {resumeFile.type === "application/pdf" ? (
                  <embed
                    src={URL.createObjectURL(resumeFile)}
                    type="application/pdf"
                    width="100%"
                    height="350px"
                    className="rounded border shadow"
                  />
                ) : (
                  <div className="text-muted-foreground text-sm">
                    <span>Preview not available. </span>
                    <a
                      href={URL.createObjectURL(resumeFile)}
                      download={resumeFile.name}
                      className="underline text-accent"
                      onClick={e => e.stopPropagation()}
                    >
                      Download
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-muted-foreground">Drop file here or click to browse</div>
            )}
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={handleModalClose}>Cancel</Button>
            </DialogClose>
            <Button type="button" disabled={!resumeFile} onClick={handleModalClose}>
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const handleClick = () => {
              if (action.action === "profile") {
                navigate("/candidate/complete-profile");
              } else if (action.action === "resume") {
                handleResumeClick();
              }
            };
            return (
              <Button
                key={action.action}
                variant="ghost"
                className="w-full justify-start h-auto p-4"
                onClick={handleClick}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{action.title}</p>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </Button>
            );
          })}
        </CardContent>
      </Card>
    </>
  );
};

export { QuickActionsCard };

