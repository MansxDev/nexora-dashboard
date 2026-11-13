import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Card, CardHeader } from '../ui/Card'
import { SearchInput, Select } from '../ui/Input'
import { Badge, statusTone } from '../ui/Badge'
import { DataTable } from '../tables/DataTable'
import type { Column } from '../tables/DataTable'
import type { Employee } from '../../types'
import { employees, departments } from '../../data/employees'
import { formatDate, initials } from '../../utils/format'
import { useTranslation } from 'react-i18next'

const allDepartments = ['All', ...departments] as const

export function EmployeeOverviewCard() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState<string>('All')

  const rows = useMemo(
    () =>
      employees.filter(
        (e) =>
          (dept === 'All' || e.department === dept) &&
          `${e.name} ${e.id} ${e.position} ${e.email}`.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [search, dept],
  )

  const columns: Column<Employee>[] = [
    { key: 'id', header: 'Employee ID', sortable: true, render: (e) => <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{e.id}</span> },
    {
      key: 'name',
      header: 'Employee Name',
      sortable: true,
      render: (e) => (
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {initials(e.name)}
          </span>
          <span className="min-w-0">
            <span className="block truncate font-medium text-slate-800 dark:text-slate-100">{e.name}</span>
            <span className="block truncate text-xs text-slate-400 dark:text-slate-500">{e.email}</span>
          </span>
        </div>
      ),
    },
    { key: 'department', header: 'Department', sortable: true },
    { key: 'position', header: 'Position' },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (e) => <Badge tone={statusTone(e.status)}>{e.status}</Badge>,
    },
    { key: 'joinDate', header: 'Join Date', sortable: true, align: 'right', render: (e) => <span className="whitespace-nowrap">{formatDate(e.joinDate)}</span> },
  ]

  return (
    <Card>
      <CardHeader
        title={t('Employee Overview')}
        subtitle={t('All team members with quick access')}
        action={
          <Link
            to="/employees"
            className="inline-flex items-center gap-1 rounded-lg text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400"
          >
            {t('View all')}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        }
      />
      <div className="grid gap-2 px-5 pb-3 sm:grid-cols-[minmax(0,1fr)_180px]">
        <SearchInput value={search} onChange={setSearch} placeholder={t('Search name, ID, position, email...')} />
        <Select value={dept} onChange={(evt) => setDept(evt.target.value)} className="w-full">
          {allDepartments.map((d) => (
            <option key={d} value={d}>
              {d === 'All' ? t('All Departments') : t(d)}
            </option>
          ))}
        </Select>
      </div>
      <DataTable rows={rows} columns={columns} rowKey={(e) => e.id} pageSize={6} />
    </Card>
  )
}
