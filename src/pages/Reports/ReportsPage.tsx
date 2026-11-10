import { useMemo, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Users, CalendarCheck, Wallet, Package, ShoppingCart, ChartColumn, Download, CircleAlert } from 'lucide-react'
import { PageHeader } from '../../components/layout/PageHeader'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { cn } from '../../utils/cn'
import { toCsv, downloadCsv } from '../../utils/csv'
import { employees } from '../../data/employees'
import { attendanceRows } from '../../data/attendance'
import { payrollHistory } from '../../data/payroll'
import { inventoryItems } from '../../data/inventory'
import { purchaseRequests } from '../../data/procurement'
import { departmentDistribution } from '../../data/dashboard'

type ReportCategory = 'employees' | 'attendance' | 'payroll' | 'inventory' | 'procurement' | 'departments'

interface CategoryMeta {
  id: ReportCategory
  label: string
  description: string
  icon: LucideIcon
}

const categories: CategoryMeta[] = [
  { id: 'employees', label: 'Employee Report', description: 'Roster, status, and employment details', icon: Users },
  { id: 'attendance', label: 'Attendance Report', description: 'Daily check-in, late, and absence records', icon: CalendarCheck },
  { id: 'payroll', label: 'Payroll Report', description: 'Processed payroll runs and totals', icon: Wallet },
  { id: 'inventory', label: 'Inventory Report', description: 'Stock levels, minimums, and movements', icon: Package },
  { id: 'procurement', label: 'Procurement Report', description: 'Purchase requests and decisions', icon: ShoppingCart },
  { id: 'departments', label: 'Department Report', description: 'Headcount distribution per department', icon: ChartColumn },
]

/** Slice rows that fall inside the selected date range. */
function sliceByDate<T>(rows: T[], getDate: (r: T) => string, from: string, to: string): T[] {
  return rows.filter((r) => getDate(r) >= from && getDate(r) <= to)
}

export function ReportsPage() {
  const [selected, setSelected] = useState<ReportCategory>('employees')
  const [from, setFrom] = useState('2026-10-10')
  const [to, setTo] = useState('2026-11-10')
  const [message, setMessage] = useState('')

  const rangeValid = from <= to

  const report = useMemo(() => {
    const meta = categories.find((c) => c.id === selected)!
    // Each branch keeps its own typed rows and CSV builder, so the memo can
    // return a single uniform shape: { count, buildCsv, meta }.
    switch (selected) {
      case 'employees': {
        const rows = employees
        return {
          meta,
          count: rows.length,
          buildCsv: () =>
            toCsv(rows, [
              { header: 'Employee ID', value: (e) => e.id },
              { header: 'Name', value: (e) => e.name },
              { header: 'Department', value: (e) => e.department },
              { header: 'Position', value: (e) => e.position },
              { header: 'Status', value: (e) => e.status },
              { header: 'Join Date', value: (e) => e.joinDate },
              { header: 'Email', value: (e) => e.email },
            ]),
        }
      }
      case 'attendance': {
        const rows = sliceByDate(attendanceRows, (r) => r.date, from, to)
        return {
          meta,
          count: rows.length,
          buildCsv: () =>
            toCsv(rows, [
              { header: 'Record ID', value: (r) => r.id },
              { header: 'Employee', value: (r) => r.name },
              { header: 'Department', value: (r) => r.department },
              { header: 'Date', value: (r) => r.date },
              { header: 'Check-in', value: (r) => r.checkIn },
              { header: 'Check-out', value: (r) => r.checkOut },
              { header: 'Status', value: (r) => r.status },
            ]),
        }
      }
      case 'payroll': {
        const rows = sliceByDate(payrollHistory, (r) => r.processedAt, from, to)
        return {
          meta,
          count: rows.length,
          buildCsv: () =>
            toCsv(rows, [
              { header: 'Run ID', value: (r) => r.id },
              { header: 'Period', value: (r) => r.period },
              { header: 'Processed At', value: (r) => r.processedAt },
              { header: 'Employees', value: (r) => r.employees },
              { header: 'Total', value: (r) => r.totalAmount },
              { header: 'Status', value: (r) => r.status },
            ]),
        }
      }
      case 'inventory': {
        const rows = sliceByDate(inventoryItems, (r) => r.lastUpdate, from, to)
        return {
          meta,
          count: rows.length,
          buildCsv: () =>
            toCsv(rows, [
              { header: 'SKU', value: (r) => r.sku },
              { header: 'Item', value: (r) => r.name },
              { header: 'Category', value: (r) => r.category },
              { header: 'Stock', value: (r) => r.stock },
              { header: 'Min Stock', value: (r) => r.minStock },
              { header: 'Unit', value: (r) => r.unit },
            ]),
        }
      }
      case 'procurement': {
        const rows = sliceByDate(purchaseRequests, (r) => r.date, from, to)
        return {
          meta,
          count: rows.length,
          buildCsv: () =>
            toCsv(rows, [
              { header: 'Request ID', value: (r) => r.id },
              { header: 'Item', value: (r) => r.itemName },
              { header: 'Requester', value: (r) => r.requester },
              { header: 'Department', value: (r) => r.department },
              { header: 'Qty', value: (r) => r.qty },
              { header: 'Est. Cost', value: (r) => r.estCost },
              { header: 'Status', value: (r) => r.status },
            ]),
        }
      }
      case 'departments':
      default: {
        const rows = departmentDistribution
        return {
          meta,
          count: rows.length,
          buildCsv: () =>
            toCsv(rows, [
              { header: 'Department', value: (d) => d.name },
              { header: 'Headcount', value: (d) => d.value },
            ]),
        }
      }
    }
  }, [selected, from, to])

  function generate() {
    if (!rangeValid) return
    const csv = report.buildCsv()
    downloadCsv(`nexora-${selected}-report.csv`, csv)
    setMessage(`Exported ${report.count} row${report.count === 1 ? '' : 's'} for “${report.meta.label}” (${from} → ${to}). Check your downloads.`)
  }

  return (
    <div className="min-w-0">
      <PageHeader title="Reports" description="Generate operational reports and export them as CSV." />

      <div className="grid min-w-0 gap-4 xl:grid-cols-3">
        <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:col-span-2">
          {categories.map(({ id, label, description, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setSelected(id)}
              aria-pressed={selected === id}
              className={cn(
                'min-w-0 rounded-xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40',
                'dark:bg-slate-900',
                selected === id
                  ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500/40 dark:bg-blue-500/10'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-[0_4px_12px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:hover:border-slate-700',
              )}
            >
              <div
                className={cn(
                  'grid h-9 w-9 place-items-center rounded-lg',
                  selected === id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
                )}
              >
                <Icon className="h-4.5 w-4.5" />
              </div>
              <p className={cn('mt-3 text-sm font-semibold', selected === id ? 'text-blue-700 dark:text-blue-300' : 'text-slate-800 dark:text-slate-100')}>
                {label}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
            </button>
          ))}
        </div>

        <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">Generate export</h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Rows are filtered by the report's date field.</p>

          <div className="mt-4 grid gap-3">
            <Input label="From date" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            <Input label="To date" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
            <Button size="md" onClick={generate} disabled={!rangeValid}>
              <Download className="h-4 w-4" />
              Generate CSV
            </Button>
            {!rangeValid ? (
              <p className="flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                <CircleAlert className="h-3.5 w-3.5" />
                "From" date must be before "to" date.
              </p>
            ) : null}
            {message ? (
              <p role="status" className="rounded-lg bg-green-50 px-3 py-2 text-xs leading-relaxed text-green-700 dark:bg-green-500/10 dark:text-green-400">
                {message}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
