import React, { useRef, useState, useEffect } from "react";
import type { CandidateFeedback } from "./mockCandidateFeedbacks";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import CandidateFeedbackDialogList from "./CandidateFeedbackDialogList";

interface CandidateFeedbackListProps {
  feedbacks: CandidateFeedback[];
}

const CandidateFeedbackList: React.FC<CandidateFeedbackListProps> = ({ feedbacks }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardsToShow, setCardsToShow] = useState(1);
  const [start, setStart] = useState(0);
  const cardWidth = 340; // px
  const total = feedbacks.length;

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const fit = Math.max(1, Math.floor(width / 340));
        setCardsToShow(fit);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showPrev = () => setStart((prev) => Math.max(prev - cardsToShow, 0));
  const showNext = () => setStart((prev) => Math.min(prev + cardsToShow, total - cardsToShow));
  return (
    <Card className="my-8 shadow-lg border bg-card text-card-foreground">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl text-foreground flex items-center gap-2">
            Candidate Feedbacks from HRs
          </CardTitle>
          <p className="text-muted-foreground text-base mt-1">See what different HRs have said about your profile and interview performance.</p>
        </div>
          <Button
            variant="ghost"
            onClick={() => setOpen(true)}
          >
            View All
          </Button>
      </CardHeader>
      <CardContent>
        {(!feedbacks || feedbacks.length === 0) ? (
          <div className="py-8 text-center">
            <span className="text-lg text-muted-foreground">No feedbacks have been provided by HRs for this candidate.</span>
          </div>
        ) : (
          <div ref={containerRef} className="flex items-center justify-center py-4 gap-4 w-full">
            <Button
              aria-label="Previous feedbacks"
              onClick={showPrev}
              disabled={start === 0}
              variant="ghost"
              size="icon"
              className="rounded-full p-2 bg-muted text-foreground shadow transition hover:bg-accent/20 disabled:opacity-40"
              style={{ minWidth: 40 }}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </Button>
            <div
              className="flex gap-6 w-full justify-center"
              style={{
                width: `${cardsToShow * cardWidth}px`,
                overflow: 'hidden',
              }}
            >
              <div
                className="flex gap-6"
                style={{
                  transform: `translateX(-${start * cardWidth}px)`,
                  transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                  width: `${feedbacks.length * cardWidth}px`,
                }}
              >
                {feedbacks.map((fb) => (
                  <div key={fb.id} className="min-w-[320px] max-w-xs bg-card text-card-foreground rounded-xl shadow-xl border border-muted flex flex-col p-5 justify-between">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="max-h-[80vh] overflow-y-auto">
                        <DialogTitle>All Feedbacks</DialogTitle>
                        <CandidateFeedbackDialogList feedbacks={feedbacks} />
                        </DialogContent>
                    </Dialog>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex flex-col">
                        <span className="font-bold text-accent text-lg flex items-center gap-2">
                          {fb.hrName}
                          {fb.rating && (
                            <Badge variant="secondary" className="ml-2 flex items-center gap-1 bg-yellow-100 text-yellow-800">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span>{fb.rating}/5</span>
                            </Badge>
                          )}
                        </span>
                        <span className="text-xs text-muted-foreground">{fb.hrEmail}</span>
                      </div>
                      <span className="ml-auto text-xs text-muted-foreground font-semibold">{new Date(fb.date).toLocaleDateString()}</span>
                    </div>
                    <div className="mb-2">
                      <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full mb-2">Role: {fb.role || "N/A"}</span>
                      <blockquote className="border-l-4 border-accent pl-3 italic text-base text-foreground">
                        {fb.comments}
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              aria-label="Next feedbacks"
              onClick={showNext}
              disabled={start + cardsToShow >= total}
              className={`rounded-full p-2 bg-muted text-foreground shadow transition hover:bg-accent/20 disabled:opacity-40`}
              style={{ minWidth: 40 }}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default CandidateFeedbackList;
