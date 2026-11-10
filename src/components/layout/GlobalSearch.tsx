import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, Search, User } from 'lucide-react'
import { cn } from '../../utils/cn'
import { employees } from '../../data/employees'
import { inventoryItems } from '../../data/inventory'

interface Result {
  id: string
  group: 'Employees' | 'Inventory'
  label: string
  sub: string
  to: string
}

function buildResults(q: string): Result[] {
  const term = q.trim().toLowerCase()
  if (!term) return []
  const people: Result[] = employees
    .filter((e) => `${e.name} ${e.department} ${e.position} ${e.id}`.toLowerCase().includes(term))
    .slice(0, 4)
    .map((e) => ({
      id: `res-emp-${e.id}`,
      group: 'Employees' as const,
      label: e.name,
      sub: `${e.position} · ${e.department}`,
      to: '/employees',
    }))
  const items: Result[] = inventoryItems
    .filter((i) => `${i.name} ${i.sku} ${i.category}`.toLowerCase().includes(term))
    .slice(0, 3)
    .map((i) => ({
      id: `res-inv-${i.id}`,
      group: 'Inventory' as const,
      label: i.name,
      sub: i.sku,
      to: '/inventory',
    }))
  return [...people, ...items].slice(0, 6)
}

const panelItemBase =
  'flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-slate-100 dark:hover:bg-slate-800'

export function GlobalSearch() {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const results = buildResults(q)

  useEffect(() => {
    if (!open) return
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function select(to: string) {
    navigate(to)
    setQ('')
    setOpen(false)
  }

  const groups: Array<'Employees' | 'Inventory'> = []
  for (const r of results) if (!groups.includes(r.group)) groups.push(r.group)

  return (
    <div className="relative hidden w-56 md:block lg:w-72" ref={ref}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search employees, items..."
          className={cn(
            'h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400',
            'transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20',
            'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-slate-800',
          )}
        />
      </div>
      {open && q.trim() ? (
        <div
          className={cn(
            'absolute top-[calc(100%+6px)] left-0 z-50 w-full rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg',
            'dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/40',
          )}
        >
          {results.length === 0 ? (
            <p className="px-3 py-2.5 text-sm text-slate-500 dark:text-slate-400">No matches for “{q.trim()}”.</p>
          ) : (
            groups.map((g) => (
              <div key={g}>
                <p className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  {g}
                </p>
                {results
                  .filter((r) => r.group === g)
                  .map((r) => (
                    <button key={r.id} type="button" onClick={() => select(r.to)} className={panelItemBase}>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        {r.group === 'Employees' ? <User className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-medium text-slate-800 dark:text-slate-100">{r.label}</span>
                        <span className="block truncate text-xs text-slate-500 dark:text-slate-400">{r.sub}</span>
                      </span>
                    </button>
                  ))}
              </div>
            ))
          )}
        </div>
      ) : null}
    </div>
  )
}
