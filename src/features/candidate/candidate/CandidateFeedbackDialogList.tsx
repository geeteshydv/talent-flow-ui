import React from "react";
import type { CandidateFeedback } from "./mockCandidateFeedbacks";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface CandidateFeedbackDialogListProps {
  feedbacks: CandidateFeedback[];
}

const CandidateFeedbackDialogList: React.FC<CandidateFeedbackDialogListProps> = ({ feedbacks }) => {
  if (!feedbacks || feedbacks.length === 0) {
    return <div className="py-8 text-center text-muted-foreground">No feedbacks available.</div>;
  }
  return (
    <div className="space-y-6">
      {feedbacks.map((fb) => (
        <Card key={fb.id} className="border-0 shadow-xl bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center gap-3 bg-white/60 rounded-t-xl border-b border-muted/30">
            <div className="flex flex-col">
              <CardTitle className="text-lg font-bold text-accent tracking-tight flex items-center gap-2">
                {fb.hrName}
                {fb.rating && (
                  <Badge variant="secondary" className="ml-2 flex items-center gap-1 bg-yellow-100 text-yellow-800">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{fb.rating}/5</span>
                  </Badge>
                )}
              </CardTitle>
              <span className="text-xs text-muted-foreground">{fb.hrEmail}</span>
            </div>
            <span className="ml-auto text-xs text-muted-foreground font-semibold">{new Date(fb.date).toLocaleDateString()}</span>
          </CardHeader>
          <CardContent>
            <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full mb-2">Role: {fb.role || "N/A"}</span>
            <blockquote className="border-l-4 border-accent pl-3 italic text-base text-foreground">
              {fb.comments}
            </blockquote>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CandidateFeedbackDialogList;
