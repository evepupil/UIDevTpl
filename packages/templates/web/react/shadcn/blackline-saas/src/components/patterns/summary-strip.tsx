import { Card, CardContent } from "@/components/ui/card"

export interface SummaryItem {
  label: string
  value: string
  detail?: string
}

export function SummaryStrip({ items }: { items: readonly SummaryItem[] }) {
  return (
    <Card className="blackline-summary-strip py-0">
      <CardContent className="blackline-summary-strip__content p-0">
        {items.map((item) => (
          <div className="blackline-summary-strip__item" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            {item.detail ? <small>{item.detail}</small> : null}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
