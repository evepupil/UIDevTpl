import type { ReactNode } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { EmptyState } from "./empty-state"

export interface ResourceColumn<T> {
  id: string
  header: ReactNode
  className?: string
  render: (item: T) => ReactNode
}

export function ResourceTable<T extends { id: string }>({
  rows,
  columns,
  emptyLabel = "No records",
}: {
  rows: readonly T[]
  columns: readonly ResourceColumn<T>[]
  emptyLabel?: string
}) {
  return (
    <>
      <Table className="min-w-[48rem]">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead className={column.className} key={column.id}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell
                  className={column.className}
                  key={`${row.id}-${column.id}`}
                >
                  {column.render(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {rows.length === 0 ? <EmptyState title={emptyLabel} /> : null}
    </>
  )
}
