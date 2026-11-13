import { useMemo, useState } from 'react'
import { Download, Plus } from 'lucide-react'
import { PageHeader } from '../../components/layout/PageHeader'
import { Card } from '../../components/ui/Card'
import { SearchInput, Select } from '../../components/ui/Input'
import { Badge, statusTone } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { DataTable } from '../../components/tables/DataTable'
import type { Column } from '../../components/tables/DataTable'
import { employees as seed, departments } from '../../data/employees'
import { toCsv, downloadCsv } from '../../utils/csv'
import { formatDate, initials } from '../../utils/format'
import { EmployeeDetailDrawer } from './EmployeeDetailDrawer'
import { AddEmployeeModal } from './AddEmployeeModal'
import type { Employee } from '../../types'
import { useTranslation } from 'react-i18next'

const allDepartments = ['All', ...departments] as const
const allStatuses = ['All', 'Active', 'Probation', 'On Leave', 'Resigned'] as const

export function EmployeesPage() {
  const { t } = useTranslation()
  const [list, setList] = useState<Employee[]>(seed)
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState<string>('All')
  const [status, setStatus] = useState<string>('All')
  const [addOpen, setAddOpen] = useState(false)
  const [selected, setSelected] = useState<Employee | null>(null)

  const rows = useMemo(
    () =>
      list.filter(
        (e) =>
          (dept === 'All' || e.department === dept) &&
          (status === 'All' || e.status === status) &&
          `${e.name} ${e.id} ${e.position} ${e.email}`.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [list, search, dept, status],
  )

  function addEmployee(draft: { name: string; email: string; department: Employee['department']; position: string; status: Employee['status'] }) {
    const nextId = `EMP-${String(list.length + 1).padStart(3, '0')}`
    setList((prev) => [
      {
        id: nextId,
        joinDate: new Date().toISOString().slice(0, 10),
        phone: '+62 812-3355-' + String(1300 + list.length),
        ...draft,
      },
      ...prev,
    ])
  }

  function exportCsv() {
    const csv = toCsv(list, [
      { header: 'Employee ID', value: (e) => e.id },
      { header: 'Name', value: (e) => e.name },
      { header: 'Department', value: (e) => e.department },
      { header: 'Position', value: (e) => e.position },
      { header: 'Status', value: (e) => e.status },
      { header: 'Join Date', value: (e) => e.joinDate },
      { header: 'Email', value: (e) => e.email },
      { header: 'Phone', value: (e) => e.phone },
    ])
    downloadCsv('nexora-employees.csv', csv)
  }

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
    <div className="min-w-0">
      <PageHeader
        title={t('Employees')}
        description={t('Manage your workforce, onboarding, and employment status.')}
        actions={
          <>
            <Button variant="outline" size="md" onClick={exportCsv}>
              <Download className="h-4 w-4" />
              {t('Export CSV')}
            </Button>
            <Button size="md" onClick={() => setAddOpen(true)}>
              <Plus className="h-4 w-4" />
              {t('Add Employee')}
            </Button>
          </>
        }
      />

      <Card className="min-w-0">
        <div className="grid gap-2 px-5 pt-5 pb-4 sm:grid-cols-[minmax(0,1fr)_170px_170px]">
          <SearchInput value={search} onChange={setSearch} placeholder={t('Search name, ID, position, email...')} />
          <Select value={dept} onChange={(evt) => setDept(evt.target.value)}>
            {allDepartments.map((d) => (
              <option key={d} value={d}>
                {d === 'All' ? t('All Departments') : t(d)}
              </option>
            ))}
          </Select>
          <Select value={status} onChange={(evt) => setStatus(evt.target.value)}>
            {allStatuses.map((s) => (
              <option key={s} value={s}>
                {s === 'All' ? t('All Statuses') : t(s)}
              </option>
            ))}
          </Select>
        </div>
        <DataTable
          rows={rows}
          columns={columns}
          rowKey={(e) => e.id}
          pageSize={8}
          onRowClick={setSelected}
          emptyTitle="No employees match your filters"
          emptyDescription="Try clearing the search box or switching departments."
        />
      </Card>

      <AddEmployeeModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={addEmployee} />
      <EmployeeDetailDrawer employee={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
