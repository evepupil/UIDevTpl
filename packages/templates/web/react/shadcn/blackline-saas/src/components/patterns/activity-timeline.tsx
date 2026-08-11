import { CircleAlert, CircleCheck, Info, XCircle } from "lucide-react"

import type { ActivityEvent } from "../../lib/platform-data"

const icons = {
  success: CircleCheck,
  info: Info,
  warning: CircleAlert,
  danger: XCircle,
} as const

export function ActivityTimeline({ events }: { events: readonly ActivityEvent[] }) {
  return (
    <div className="blackline-timeline">
      {events.map((event) => {
        const Icon = icons[event.tone]
        return (
          <div className="blackline-timeline__item" key={event.id}>
            <div className={`blackline-timeline__icon blackline-timeline__icon--${event.tone}`}>
              <Icon aria-hidden="true" />
            </div>
            <div className="blackline-timeline__copy">
              <strong>{event.title}</strong>
              <span>{event.detail}</span>
            </div>
            <time>{event.time}</time>
          </div>
        )
      })}
    </div>
  )
}
