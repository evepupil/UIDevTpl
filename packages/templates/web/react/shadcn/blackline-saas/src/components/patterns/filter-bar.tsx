import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface FilterOption {
  value: string
  label: string
}

export function FilterBar({
  query,
  onQueryChange,
  queryLabel = "Search",
  filters = [],
}: {
  query: string
  onQueryChange: (value: string) => void
  queryLabel?: string
  filters?: Array<{
    label: string
    value: string
    options: readonly FilterOption[]
    onChange: (value: string) => void
  }>
}) {
  return (
    <div className="blackline-filter-bar">
      <div className="blackline-search">
        <Search aria-hidden="true" />
        <Input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={queryLabel} aria-label={queryLabel} />
      </div>
      <div className="blackline-filter-bar__controls">
        {filters.map((filter) => {
          const selected = filter.options.find((option) => option.value === filter.value)?.label ?? filter.value
          return (
            <Select key={filter.label} value={filter.value} onValueChange={(value) => value && filter.onChange(value)}>
              <SelectTrigger size="sm" className="blackline-filter-select" aria-label={filter.label}>
                <SelectValue>{selected}</SelectValue>
              </SelectTrigger>
              <SelectContent align="end">
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        })}
      </div>
    </div>
  )
}
