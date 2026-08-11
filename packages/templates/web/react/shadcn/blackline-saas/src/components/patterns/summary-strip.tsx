export interface SummaryItem {
  label: string
  value: string
  detail?: string
}

export function SummaryStrip({ items }: { items: readonly SummaryItem[] }) {
  return (
    <div className="blackline-summary-strip">
      {items.map((item) => (
        <div className="blackline-summary-strip__item" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
          {item.detail ? <small>{item.detail}</small> : null}
        </div>
      ))}
    </div>
  )
}
