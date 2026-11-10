import { Suspense, lazy } from 'react'
import type { ComponentType } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { PageSkeleton } from '../components/layout/PageSkeleton'

const OverviewPage = lazy(() => import('../pages/Overview/OverviewPage').then((m) => ({ default: m.OverviewPage })))
const AnalyticsPage = lazy(() => import('../pages/Analytics/AnalyticsPage').then((m) => ({ default: m.AnalyticsPage })))
const EmployeesPage = lazy(() => import('../pages/Employees/EmployeesPage').then((m) => ({ default: m.EmployeesPage })))
const AttendancePage = lazy(() => import('../pages/Attendance/AttendancePage').then((m) => ({ default: m.AttendancePage })))
const PayrollPage = lazy(() => import('../pages/Payroll/PayrollPage').then((m) => ({ default: m.PayrollPage })))
const InventoryPage = lazy(() => import('../pages/Inventory/InventoryPage').then((m) => ({ default: m.InventoryPage })))
const ProcurementPage = lazy(() => import('../pages/Procurement/ProcurementPage').then((m) => ({ default: m.ProcurementPage })))
const ReportsPage = lazy(() => import('../pages/Reports/ReportsPage').then((m) => ({ default: m.ReportsPage })))
const NotificationsPage = lazy(() => import('../pages/Notifications/NotificationsPage').then((m) => ({ default: m.NotificationsPage })))
const SettingsPage = lazy(() => import('../pages/Settings/SettingsPage').then((m) => ({ default: m.SettingsPage })))

function page(Comp: ComponentType) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Comp />
    </Suspense>
  )
}

export const appRoutes: RouteObject[] = [
  {
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Navigate to="/overview" replace /> },
      { path: 'overview', element: page(OverviewPage) },
      { path: 'analytics', element: page(AnalyticsPage) },
      { path: 'employees', element: page(EmployeesPage) },
      { path: 'attendance', element: page(AttendancePage) },
      { path: 'payroll', element: page(PayrollPage) },
      { path: 'inventory', element: page(InventoryPage) },
      { path: 'procurement', element: page(ProcurementPage) },
      { path: 'reports', element: page(ReportsPage) },
      { path: 'notifications', element: page(NotificationsPage) },
      { path: 'settings', element: page(SettingsPage) },
      { path: '*', element: <Navigate to="/overview" replace /> },
    ],
  },
]
