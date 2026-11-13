import { Users, CalendarCheck, Package, ClipboardList } from 'lucide-react'
import { Card, CardBody, CardHeader } from '../../components/ui/Card'
import { StatCard } from '../../components/dashboard/StatCard'
import { WelcomeSection } from '../../components/dashboard/WelcomeSection'
import { RecentActivities } from '../../components/dashboard/RecentActivities'
import { PendingTasks } from '../../components/dashboard/PendingTasks'
import { EmployeeOverviewCard } from '../../components/dashboard/EmployeeOverviewCard'
import { AttendanceLineChart } from '../../components/charts/AttendanceLineChart'
import { InventoryBarChart } from '../../components/charts/InventoryBarChart'
import { DepartmentPieChart } from '../../components/charts/DepartmentPieChart'
import { attendanceSeries } from '../../data/attendance'
import { stockFlow } from '../../data/inventory'
import { departmentDistribution, overviewStats, pendingTasks, recentActivities } from '../../data/dashboard'
import type { StatKind } from '../../types'
import { useTranslation } from 'react-i18next'

const statIcons: Record<StatKind, { icon: typeof Users; tone: 'blue' | 'green' | 'amber' | 'rose' }> = {
  employees: { icon: Users, tone: 'blue' },
  attendance: { icon: CalendarCheck, tone: 'green' },
  inventory: { icon: Package, tone: 'amber' },
  requests: { icon: ClipboardList, tone: 'rose' },
}

export function OverviewPage() {
  const { t } = useTranslation()
  return (
    <div className="grid gap-4">
      <WelcomeSection />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((stat) => {
          const { icon, tone } = statIcons[stat.kind]
          return <StatCard key={stat.id} stat={stat} icon={icon} tone={tone} />
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="min-w-0 xl:col-span-2">
          <CardHeader title={t('Employee Attendance')} subtitle={t('Present, late, and absent over the last 7 days')} />
          <CardBody>
            <AttendanceLineChart data={attendanceSeries} />
          </CardBody>
        </Card>
        <Card className="min-w-0">
          <CardHeader title={t('Departments')} subtitle={t('Headcount distribution')} />
          <CardBody className="pt-2">
            <DepartmentPieChart data={departmentDistribution} />
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="min-w-0 xl:col-span-2">
          <CardHeader title={t('Inventory Movement')} subtitle={t('Stock in vs stock out, last 6 months')} />
          <CardBody>
            <InventoryBarChart data={stockFlow} />
          </CardBody>
        </Card>
        <Card className="min-w-0">
          <CardHeader title={t('Recent Activities')} />
          <CardBody className="pt-1">
            <RecentActivities items={recentActivities} />
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <EmployeeOverviewCard />
        </div>
        <Card className="min-w-0">
          <CardHeader title={t('Pending Tasks')} subtitle={t('Waiting for your action')} />
          <CardBody className="px-2 pb-4">
            <PendingTasks tasks={pendingTasks} />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
