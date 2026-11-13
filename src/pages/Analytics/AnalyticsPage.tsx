import { CalendarCheck, Package, TrendingUp, Timer, ArrowRight } from 'lucide-react'
import { PageHeader } from '../../components/layout/PageHeader'
import { Card, CardBody, CardHeader } from '../../components/ui/Card'
import { StatTile } from '../../components/dashboard/StatTile'
import { DataTable } from '../../components/tables/DataTable'
import type { Column } from '../../components/tables/DataTable'
import { AttendanceLineChart } from '../../components/charts/AttendanceLineChart'
import { InventoryBarChart } from '../../components/charts/InventoryBarChart'
import { DepartmentPieChart } from '../../components/charts/DepartmentPieChart'
import { attendanceSeries } from '../../data/attendance'
import { stockFlow } from '../../data/inventory'
import { analyticsStats, departmentDistribution } from '../../data/dashboard'
import type { DepartmentSlice } from '../../types'
import { useTranslation } from 'react-i18next'

const totalEmployees = departmentDistribution.reduce((s, d) => s + d.value, 0)

export function AnalyticsPage() {
  const { t } = useTranslation()

  // Kolom tabel departemen dibuat di dalam komponen agar bisa memakai t().
  const depColumns: Column<DepartmentSlice>[] = [
    { key: 'name', header: 'Department', sortable: true, render: (d) => <span className="font-medium text-slate-800 dark:text-slate-100">{t(d.name)}</span> },
    { key: 'value', header: 'Headcount', align: 'right', sortable: true, render: (d) => <span className="tabular-nums">{d.value}</span> },
    {
      key: 'share',
      header: 'Share',
      align: 'right',
      render: (d) => <span className="tabular-nums text-slate-500">{Math.round((d.value / totalEmployees) * 100)}%</span>,
    },
  ]

  return (
    <div className="min-w-0">
      <PageHeader title={t('Analytics')} description={t('Business statistics across attendance, inventory, and departments.')} />

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile icon={TrendingUp} tone="blue" label={analyticsStats[0].label} value={t(analyticsStats[0].value)} hint={analyticsStats[0].period} />
        <StatTile icon={CalendarCheck} tone="green" label={analyticsStats[1].label} value={t(analyticsStats[1].value)} hint={analyticsStats[1].period} />
        <StatTile icon={Package} tone="amber" label={analyticsStats[2].label} value={t(analyticsStats[2].value)} hint={analyticsStats[2].period} />
        <StatTile icon={Timer} tone="rose" label={analyticsStats[3].label} value={t(analyticsStats[3].value)} hint={analyticsStats[3].period} />
      </div>

      <div className="grid min-w-0 gap-4">
        <div className="grid min-w-0 gap-4 xl:grid-cols-3">
          <Card className="min-w-0 xl:col-span-2">
            <CardHeader
              title={t('Attendance Analytics')}
              subtitle={t('Present, late, and absent over the last 7 days')}
              action={<ArrowRight className="h-4 w-4 text-slate-300" aria-hidden="true" />}
            />
            <CardBody>
              <AttendanceLineChart data={attendanceSeries} />
            </CardBody>
          </Card>
          <Card className="min-w-0">
            <CardHeader title={t('Department Analytics')} subtitle={t('Headcount distribution')} />
            <CardBody className="pt-2">
              <DepartmentPieChart data={departmentDistribution} />
            </CardBody>
          </Card>
        </div>

        <div className="grid min-w-0 gap-4 xl:grid-cols-3">
          <Card className="min-w-0 xl:col-span-2">
            <CardHeader title={t('Inventory Analytics')} subtitle={t('Stock in vs stock out by month')} />
            <CardBody>
              <InventoryBarChart data={stockFlow} />
            </CardBody>
          </Card>
          <Card className="min-w-0">
            <CardHeader title={t('Departments Summary')} subtitle={t('Total {{count}} employees', { count: totalEmployees })} />
            <DataTable rows={departmentDistribution} columns={depColumns} rowKey={(d) => d.name} pageSize={6} />
          </Card>
        </div>
      </div>
    </div>
  )
}
