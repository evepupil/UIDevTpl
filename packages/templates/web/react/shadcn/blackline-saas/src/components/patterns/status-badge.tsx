import { CircleAlert, CircleCheck, CircleDot, LoaderCircle, PauseCircle, XCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"

type StatusValue = "Ready" | "Building" | "Failed" | "Canceled" | "Paused" | "Paid" | "Open" | "Past due"

const statusConfig: Record<StatusValue, { tone: string; icon: typeof CircleCheck }> = {
  Ready: { tone: "success", icon: CircleCheck },
  Building: { tone: "info", icon: LoaderCircle },
  Failed: { tone: "danger", icon: XCircle },
  Canceled: { tone: "neutral", icon: CircleDot },
  Paused: { tone: "warning", icon: PauseCircle },
  Paid: { tone: "success", icon: CircleCheck },
  Open: { tone: "info", icon: CircleDot },
  "Past due": { tone: "danger", icon: CircleAlert },
}

export interface StatusBadgeProps {
  status: StatusValue
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge variant="outline" className={`blackline-status blackline-status--${config.tone} ${className ?? ""}`}>
      <Icon aria-hidden="true" className={status === "Building" ? "blackline-status__spinner" : undefined} />
      {status}
    </Badge>
  )
}
