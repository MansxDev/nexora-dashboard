import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown, SearchX } from 'lucide-react'
import { cn } from '../../utils/cn'
import { EmptyState } from '../ui/EmptyState'
import { Pagination } from './Pagination'

export interface Column<T> {
  key: string
  header: string
  sortable?: boolean
  align?: 'left' | 'right' | 'center'
  /** Custom cell rendering; falls back to the row's `key` property. */
  render?: (row: T) => ReactNode
  /** Sort value extractor; falls back to `row[key]`. */
  sortValue?: (row: T) => string | number
}

interface DataTableProps<T> {
  columns: Column<T>[]
  rows: T[]
  rowKey: (row: T) => string
  pageSize?: number
  onRowClick?: (row: T) => void
  emptyTitle?: string
  emptyDescription?: string
  initialSort?: { key: string; dir: 'asc' | 'desc' }
}

type SortDir = 'asc' | 'desc'

interface SortState {
  key: string
  dir: SortDir
}

function sortValueOf<T>(col: Column<T>, row: T): string | number {
  if (col.sortValue) return col.sortValue(row)
  const v = (row as unknown as Record<string, unknown>)[col.key]
  if (typeof v === 'number') return v
  if (typeof v === 'string') return v
  return ''
}

function compareValues(a: string | number, b: string | number, dir: SortDir): number {
  const base = typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b))
  return dir === 'asc' ? base : -base
}

/**
 * Client-side table: sorting + pagination handled internally.
 * Search & filters stay with the page — pass already-filtered `rows`.
 */
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  pageSize = 8,
  onRowClick,
  emptyTitle = 'No results found',
  emptyDescription = 'Try adjusting your search or filters.',
  initialSort,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState | null>(initialSort ?? null)
  const [page, setPage] = useState(1)

  // Re-check clamping when the row set changes (search/filter shrink/grow).
  useEffect(() => {
    setPage(1)
  }, [rows.length])

  const sorted = useMemo(() => {
    if (!sort) return rows
    const col = columns.find((c) => c.key === sort.key)
    if (!col) return rows
    return [...rows].sort((a, b) => compareValues(sortValueOf(col, a), sortValueOf(col, b), sort.dir))
  }, [rows, columns, sort])

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  const current = Math.min(page, pageCount)
  const visible = sorted.slice((current - 1) * pageSize, current * pageSize)

  function toggleSort(col: Column<T>) {
    if (!col.sortable) return
    setSort((prev) =>
      prev && prev.key === col.key ? (prev.dir === 'asc' ? { key: col.key, dir: 'desc' } : null) : { key: col.key, dir: 'asc' },
    )
  }

  const alignClass = { left: 'text-left', right: 'text-right', center: 'text-center' } as const

  if (rows.length === 0) {
    return <EmptyState icon={SearchX} title={emptyTitle} description={emptyDescription} />
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              {columns.map((col) => {
                const active = sort?.key === col.key
                return (
                  <th
                    key={col.key}
                    scope="col"
                    className={cn(
                      'sticky top-0 z-10 whitespace-nowrap border-b border-slate-200 bg-slate-50/80 px-5 py-3 text-xs font-semibold text-slate-500 backdrop-blur',
                      'dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400',
                      alignClass[col.align ?? 'left'],
                    )}
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(col)}
                        className={cn(
                          'inline-flex items-center gap-1 transition-colors hover:text-slate-800 dark:hover:text-slate-200',
                          active && 'text-blue-600 dark:text-blue-400',
                          col.align === 'right' && 'flex-row-reverse',
                        )}
                      >
                        {col.header}
                        {active ? (
                          sort?.dir === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                        ) : (
                          <ArrowUpDown className="h-3 w-3 opacity-40" />
                        )}
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr
                key={rowKey(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(
                  'border-b border-slate-100 transition-colors dark:border-slate-800/60',
                  onRowClick && 'cursor-pointer',
                  'hover:bg-slate-50 dark:hover:bg-slate-800/40',
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn('px-5 py-3 text-slate-700 dark:text-slate-300', alignClass[col.align ?? 'left'])}>
                    {col.render ? col.render(row) : String((row as unknown as Record<string, unknown>)[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing <span className="font-medium text-slate-700 dark:text-slate-200">{visible.length}</span> of{' '}
          <span className="font-medium text-slate-700 dark:text-slate-200">{sorted.length}</span> entries
        </p>
        <Pagination page={current} pageCount={pageCount} onPageChange={setPage} />
      </div>
    </div>
  )
}
