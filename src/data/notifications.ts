import type { NotificationItem } from '../types'

export const notificationsSeed: NotificationItem[] = [
  { id: 'nt-01', kind: 'payroll', title: 'November payroll is ready for review', body: 'Draft payroll for 248 employees has been recalculated.', time: '25 min ago', read: false },
  { id: 'nt-02', kind: 'inventory', title: 'Low stock: Latex Gloves', body: 'Stock 58 / min 60 — consider restocking this week.', time: '2 h ago', read: false },
  { id: 'nt-03', kind: 'procurement', title: 'PR-1042 needs approval', body: 'Rizky Ramadhan requested a 24-port networking switch (urgent).', time: '3 h ago', read: false },
  { id: 'nt-04', kind: 'attendance', title: 'Attendance summary published', body: 'Today: 216 present · 20 late · 12 absent.', time: '5 h ago', read: true },
  { id: 'nt-05', kind: 'system', title: 'Backup completed', body: 'Daily automated backup finished at 02:00.', time: '8 h ago', read: true },
  { id: 'nt-06', kind: 'inventory', title: 'Stock transfer approved', body: 'Transfer INV-013 → Warehouse B has been approved.', time: 'Yesterday', read: true },
  { id: 'nt-07', kind: 'system', title: 'New update available', body: 'NEXORA Center update improves report exports.', time: '2 days ago', read: true },
]
