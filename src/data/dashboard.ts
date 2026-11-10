import type { ActivityItem, DepartmentSlice, OverviewStat, PendingTask } from '../types'

export const overviewStats: OverviewStat[] = [
  { id: 'st-employees', label: 'Total Employees', value: 248, change: 12.5, period: 'vs last month', kind: 'employees' },
  { id: 'st-present', label: 'Present Today', value: 216, change: 8.2, period: 'vs yesterday', kind: 'attendance' },
  { id: 'st-inventory', label: 'Total Inventory', value: 1284, change: 4.3, period: 'vs last week', kind: 'inventory' },
  { id: 'st-requests', label: 'Pending Requests', value: 18, change: -2.1, period: 'vs last month', kind: 'requests' },
]

export const departmentDistribution: DepartmentSlice[] = [
  { name: 'Production', value: 98 },
  { name: 'Warehouse', value: 52 },
  { name: 'HR', value: 42 },
  { name: 'Finance', value: 36 },
  { name: 'IT', value: 20 },
]

export const recentActivities: ActivityItem[] = [
  { id: 'ac-01', kind: 'employee', title: 'Employee added', detail: 'Maria Simatupang joined HR as Recruitment Specialist', time: '12 min ago' },
  { id: 'ac-02', kind: 'attendance', title: 'Attendance recorded', detail: '216 check-ins captured for today', time: '34 min ago' },
  { id: 'ac-03', kind: 'inventory', title: 'Inventory updated', detail: 'Packaging Tape 48mm stock adjusted −120 rolls', time: '1 h ago' },
  { id: 'ac-04', kind: 'leave', title: 'Leave request submitted', detail: 'Rizky Ramadhan requested 3 days annual leave', time: '2 h ago' },
  { id: 'ac-05', kind: 'payroll', title: 'Payroll updated', detail: 'November payroll draft recalculated (248 employees)', time: '4 h ago' },
  { id: 'ac-06', kind: 'inventory', title: 'Low stock alert', detail: 'Engine Oil 5W-30 dropped below minimum level', time: '5 h ago' },
]

export const pendingTasks: PendingTask[] = [
  { id: 'tk-01', category: 'Leave Request', title: 'Leave requests awaiting approval', detail: 'Annual leave + sick leave requests from 5 employees', count: 5, href: '/attendance' },
  { id: 'tk-02', category: 'Low Stock', title: 'Low stock alerts', detail: 'Items at or below minimum stock level', count: 4, href: '/inventory' },
  { id: 'tk-03', category: 'Inventory Transaction', title: 'Pending inventory transactions', detail: 'Stock movements waiting for approval', count: 2, href: '/inventory' },
  { id: 'tk-04', category: 'Employee Data', title: 'Employee data verification', detail: 'Onboarding profiles incomplete', count: 3, href: '/employees' },
]

/** Attendance page — today's snapshot headline numbers (Tue). */
export const attendanceStats = { presentToday: 216, late: 20, absent: 12 } as const

/** Analytics page — business statistics cards. */
export const analyticsStats = [
  { id: 'an-01', label: 'Revenue (MTD)', value: '$482,000', change: +7.4, period: 'vs last month' },
  { id: 'an-02', label: 'Avg. Attendance Rate', value: '91.2%', change: +1.8, period: 'this week' },
  { id: 'an-03', label: 'Inventory Turnover', value: '4.6×', change: +0.4, period: 'vs last month' },
  { id: 'an-04', label: 'Procurement Cycle', value: '3.2 days', change: -0.3, period: 'avg. approval time' },
] as const
