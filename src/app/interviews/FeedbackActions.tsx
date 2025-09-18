"use client"

import { Button } from "@/components/ui/button"
import { Save, Send } from "lucide-react"

export function FeedbackActions({ onSave, onSubmit }: { onSave: () => void; onSubmit: () => void }) {
  return (
    <div className="flex flex-col gap-3">
      <Button className="w-full gap-2" onClick={onSave}>
        <Save className="w-4 h-4" />
        Save Feedback
      </Button>
      <Button variant="outline" className="w-full gap-2 bg-transparent" onClick={onSubmit}>
        <Send className="w-4 h-4" />
        Submit & Notify Team
      </Button>
    </div>
  )
}
