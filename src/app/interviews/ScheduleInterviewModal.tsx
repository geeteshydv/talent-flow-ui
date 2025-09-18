"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Users, Video, MapPin } from "lucide-react"

export function ScheduleInterviewModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button className="gap-2 bg-primary hover:bg-primary/90" onClick={() => setOpen(true)}>
        <Calendar className="w-4 h-4" />
        Schedule Interview
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Schedule New Interview</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <Input placeholder="Candidate Name" />
            <Input placeholder="Position" />
            <div className="flex gap-2">
              <Input type="date" className="flex-1" />
              <Input type="time" className="flex-1" />
            </div>
            <Input placeholder="Duration (e.g. 45 min)" />
            <Input placeholder="Interviewer Name" />
            <Input placeholder="Location / Meeting Link" />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button className="bg-primary">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
