"use client"

import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2 } from "lucide-react"

type Props = {
  onView: () => void
  onEdit: () => void
  onDelete: () => void
}

export function JobActions({ onView, onEdit, onDelete }: Props) {
  return (
    <div className="flex items-center gap-2 ml-4">
      <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={onView}>
        <Eye className="w-4 h-4" />
        View
      </Button>
      <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={onEdit}>
        <Edit className="w-4 h-4" />
        Edit
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="gap-2 text-destructive hover:text-destructive bg-transparent"
        onClick={onDelete}
      >
        <Trash2 className="w-4 h-4" />
        Delete
      </Button>
    </div>
  )
}
