import type { ReactNode } from "react"

export function PageHeader({
  title,
  meta,
  actions,
}: {
  title: string
  meta?: ReactNode
  actions?: ReactNode
}) {
  return (
    <div className="blackline-page-header">
      <div className="blackline-page-header__title">
        <h1>{title}</h1>
        {meta}
      </div>
      {actions ? <div className="blackline-page-header__actions">{actions}</div> : null}
    </div>
  )
}
