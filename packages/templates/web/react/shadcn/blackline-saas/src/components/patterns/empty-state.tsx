import type { ReactNode } from "react"

import { Search } from "lucide-react"

export function EmptyState({ icon = <Search aria-hidden="true" />, title = "No records" }: { icon?: ReactNode; title?: string }) {
  return (
    <div className="blackline-empty" role="status">
      {icon}
      <span>{title}</span>
    </div>
  )
}
