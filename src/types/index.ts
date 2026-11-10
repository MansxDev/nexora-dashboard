// ── Core entities ─────────────────────────────────────────────────────────────

export type Theme = 'light' | 'dark'

export interface Company {
  id: string
  name: string
}

export type EmployeeStatus = 'Active' | 'Probation' | 'On Leave' | 'Resigned'
export type Department = 'HR' | 'Production' | 'Finance' | 'Warehouse' | 'IT'

export interface Employee {
  id: string
  name: string
  department: Department
  position: string
  status: EmployeeStatus
  joinDate: string // ISO date
  email: string
  phone: string
}

export type AttendanceStatus = 'Present' | 'Late' | 'Absent' | 'Leave'

export interface AttendanceRow {
  id: string
  employeeId: string
  name: string
  department: Department
  date: string
  checkIn: string // '08:02' or '—'
  checkOut: string
  status: AttendanceStatus
}

export interface AttendancePoint {
  day: string
  present: number
  absent: number
  late: number
}

export type PayrollStatus = 'Paid' | 'Pending' | 'Processing'

export interface PayrollRecord {
  id: string
  employeeName: string
  department: Department
  period: string
  basic: number
  allowance: number
  deduction: number
  net: number
  status: PayrollStatus
}

export interface PayrollHistoryRow {
  id: string
  period: string
  processedAt: string
  employees: number
  totalAmount: number
  status: PayrollStatus
}

export interface InventoryItem {
  id: string
  sku: string
  name: string
  category: string
  stock: number
  minStock: number
  unit: string
  lastUpdate: string
}

export interface StockFlowPoint {
  month: string
  stockIn: number
  stockOut: number
}

export type PrStatus = 'Pending' | 'Approved' | 'Rejected' | 'Ordered'
export type PrPriority = 'Normal' | 'Urgent'

export interface PurchaseRequest {
  id: string
  requester: string
  department: Department
  itemName: string
  qty: number
  estCost: number
  date: string
  status: PrStatus
  priority: PrPriority
}

export interface Supplier {
  id: string
  name: string
  category: string
  email: string
  phone: string
  rating: number
  onTimeRate: number // percent
  partnerSince: string
}

// ── Dashboard widgets ─────────────────────────────────────────────────────────

export type ActivityKind = 'employee' | 'attendance' | 'inventory' | 'leave' | 'payroll'

export interface ActivityItem {
  id: string
  kind: ActivityKind
  title: string
  detail: string
  time: string
}

export interface PendingTask {
  id: string
  category: 'Leave Request' | 'Low Stock' | 'Inventory Transaction' | 'Employee Data'
  title: string
  detail: string
  count: number
  href: string
}

export type NotificationKind = 'attendance' | 'payroll' | 'inventory' | 'procurement' | 'system'

export const notificationPrefKeys = ['payroll', 'inventory', 'procurement', 'system'] as const
export type NotificationPrefKey = (typeof notificationPrefKeys)[number]

export type NotificationPrefs = Record<NotificationPrefKey, boolean>

export interface NotificationItem {
  id: string
  kind: NotificationKind
  title: string
  body: string
  time: string
  read: boolean
}

export type StatKind = 'employees' | 'attendance' | 'inventory' | 'requests'

export interface OverviewStat {
  id: string
  label: string
  value: number
  change: number // percent, signed
  period: string
  kind: StatKind
}

export interface DepartmentSlice {
  name: Department
  value: number
}
