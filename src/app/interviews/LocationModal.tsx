"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MapPin } from "lucide-react"

export function LocationModal({ location }: { location: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button size="sm" className="gap-2" onClick={() => setOpen(true)}>
        <MapPin className="w-4 h-4" />
        View Location
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Interview Location</DialogTitle>
          </DialogHeader>
          <div className="text-muted-foreground">{location}</div>
        </DialogContent>
      </Dialog>
    </>
  )
}
