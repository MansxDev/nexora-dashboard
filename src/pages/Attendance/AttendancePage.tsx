import { useMemo, useState } from 'react'
import { PageHeader } from '../../components/layout/PageHeader'
import { Card, CardHeader } from '../../components/ui/Card'
import { StatTile } from '../../components/dashboard/StatTile'
import { Badge, statusTone } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { SearchInput, Select } from '../../components/ui/Input'
import { DataTable } from '../../components/tables/DataTable'
import type { Column } from '../../components/tables/DataTable'
import { attendanceRows as seedRows, attendanceSeries } from '../../data/attendance'
import { departments } from '../../data/employees'
import { attendanceStats } from '../../data/dashboard'
import { clockNow } from '../../utils/format'
import { EmptyState } from '../../components/ui/EmptyState'
import { CircleCheck, CalendarX2, Clock, UserX, Plane } from 'lucide-react'
import type { AttendanceRow } from '../../types'
import { useTranslation } from 'react-i18next'

const dateOptions = [
  { value: '2026-11-10', label: 'Today — Nov 10, 2026' },
  { value: '2026-11-09', label: 'Yesterday — Nov 09, 2026' },
  { value: '2026-11-07', label: 'Last Friday — Nov 07, 2026' },
] as const

const summaryIcons = [CircleCheck, Clock, UserX, Plane] as const
const summaryTones = ['green', 'amber', 'rose', 'blue'] as const

export function AttendancePage() {
  const { t } = useTranslation()
  const [rows, setRows] = useState<AttendanceRow[]>(seedRows)
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState<string>('All')
  const [status, setStatus] = useState<string>('All')
  const [date, setDate] = useState<string>(dateOptions[0].value)

  // Last "working day" in the demo series is Tuesday (= today).
  const summary = useMemo(
    () => [
      { label: 'Present Today', value: attendanceSeries[1].present },
      { label: 'Late Arrivals', value: attendanceSeries[1].late },
      { label: 'Absent', value: attendanceSeries[1].absent },
      { label: 'On Leave', value: 12 },
    ],
    [],
  )

  // Toggle the check state; every mutation is local store only (demo).
  function toggleClock(id: string) {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r
        if (r.status === 'Leave' || r.status === 'Absent') return r
        if (r.checkIn === '—') return { ...r, checkIn: clockNow() }
        if (r.checkOut === '—') return { ...r, checkOut: clockNow() }
        return r
      }),
    )
  }

  const filtered = useMemo(
    () =>
      rows.filter(
        (r) =>
          r.date === date &&
          (dept === 'All' || r.department === dept) &&
          (status === 'All' || r.status === status) &&
          `${r.name} ${r.employeeId}`.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [rows, date, dept, status, search],
  )

  const columns: Column<AttendanceRow>[] = [
    { key: 'employeeId', header: 'Employee ID', sortable: true, render: (r) => <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{r.employeeId}</span> },
    { key: 'name', header: 'Employee Name', sortable: true },
    { key: 'department', header: 'Department', sortable: true },
    { key: 'checkIn', header: 'Check-in', sortable: true, align: 'center', render: (r) => <span className="tabular-nums">{r.checkIn}</span> },
    { key: 'checkOut', header: 'Check-out', sortable: true, align: 'center', render: (r) => <span className="tabular-nums">{r.checkOut}</span> },
    { key: 'status', header: 'Status', sortable: true, render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
    {
      key: 'action',
      header: 'Action',
      align: 'right',
      render: (r) => {
        if (r.status === 'Leave' || r.status === 'Absent') {
          return <span className="text-xs text-slate-400 dark:text-slate-500">—</span>
        }
        if (r.checkIn === '—') {
          return (
            <Button size="sm" variant="outline" onClick={() => toggleClock(r.id)}>
              {t('Check in')}
            </Button>
          )
        }
        if (r.checkOut === '—') {
          return (
            <Button size="sm" variant="outline" onClick={() => toggleClock(r.id)}>
              {t('Check out')}
            </Button>
          )
        }
        return <span className="text-xs text-slate-400 dark:text-slate-500">{t('Recorded')}</span>
      },
    },
  ]

  return (
    <div className="min-w-0">
      <PageHeader title={t('Attendance')} description={t('Daily check-in records, late arrivals, and leave tracking.')} />

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {summary.map((s, i) => (
          <StatTile key={s.label} icon={summaryIcons[i]} tone={summaryTones[i]} label={s.label} value={s.value} />
        ))}
      </div>

      <Card className="min-w-0">
        <CardHeader title={t('Attendance Records')} subtitle={t('Mock clock actions update the table instantly.')} />
        <div className="grid gap-2 px-5 pb-4 sm:grid-cols-[minmax(0,1fr)_170px_150px_210px]">
          <SearchInput value={search} onChange={setSearch} placeholder={t('Search employee name or ID...')} />
          <Select value={dept} onChange={(e) => setDept(e.target.value)}>
            <option value="All">{t('All Departments')}</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {t(d)}
              </option>
            ))}
          </Select>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="All">{t('All Statuses')}</option>
            <option value="Present">{t('Present')}</option>
            <option value="Late">{t('Late')}</option>
            <option value="Absent">{t('Absent')}</option>
            <option value="Leave">{t('Leave')}</option>
          </Select>
          <Select value={date} onChange={(e) => setDate(e.target.value)}>
            {dateOptions.map((d) => (
              <option key={d.value} value={d.value}>
                {t(d.label)}
              </option>
            ))}
          </Select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={CalendarX2}
            title={t('No attendance records for this selection')}
            description={t('Try switching the date to Today or clearing your filters — the demo dataset only contains records for Nov 10, 2026.')}
            className="pb-6"
          />
        ) : (
          <DataTable rows={filtered} columns={columns} rowKey={(r) => r.id} pageSize={8} />
        )}
      </Card>

      <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
        {t("Attendance summary published daily at 17:00 · today's snapshot: {{present}} present · {{late}} late · {{absent}} absent.", {
          present: attendanceStats.presentToday,
          late: attendanceStats.late,
          absent: attendanceStats.absent,
        })}
      </p>
    </div>
  )
}
