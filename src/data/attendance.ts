import type { AttendancePoint, AttendanceRow } from '../types'

/** Series for the 7-day attendance line chart. */
export const attendanceSeries: AttendancePoint[] = [
  { day: 'Mon', present: 204, absent: 18, late: 26 },
  { day: 'Tue', present: 216, absent: 12, late: 20 },
  { day: 'Wed', present: 209, absent: 15, late: 24 },
  { day: 'Thu', present: 221, absent: 9, late: 18 },
  { day: 'Fri', present: 214, absent: 14, late: 22 },
  { day: 'Sat', present: 186, absent: 21, late: 16 },
  { day: 'Sun', present: 198, absent: 17, late: 21 },
]

/** Rendered mock rows for the attendance table (today, 2026-11-10). */
export const attendanceRows: AttendanceRow[] = [
  { id: 'AT-1001', employeeId: 'EMP-001', name: 'Andi Prasetyo', department: 'Production', date: '2026-11-10', checkIn: '07:42', checkOut: '16:35', status: 'Present' },
  { id: 'AT-1002', employeeId: 'EMP-002', name: 'Bunga Maharani', department: 'HR', date: '2026-11-10', checkIn: '08:28', checkOut: '17:10', status: 'Late' },
  { id: 'AT-1003', employeeId: 'EMP-003', name: 'Dewi Anggraini', department: 'Finance', date: '2026-11-10', checkIn: '07:55', checkOut: '16:58', status: 'Present' },
  { id: 'AT-1004', employeeId: 'EMP-004', name: 'Fajar Nugroho', department: 'Warehouse', date: '2026-11-10', checkIn: '—', checkOut: '—', status: 'Absent' },
  { id: 'AT-1005', employeeId: 'EMP-005', name: 'Rizky Ramadhan', department: 'IT', date: '2026-11-10', checkIn: '—', checkOut: '—', status: 'Leave' },
  { id: 'AT-1006', employeeId: 'EMP-006', name: 'Siti Halimah', department: 'Production', date: '2026-11-10', checkIn: '07:15', checkOut: '16:20', status: 'Present' },
  { id: 'AT-1007', employeeId: 'EMP-007', name: 'Jonathan Wijaya', department: 'Finance', date: '2026-11-10', checkIn: '08:19', checkOut: '17:02', status: 'Late' },
  { id: 'AT-1008', employeeId: 'EMP-008', name: 'Maria Simatupang', department: 'HR', date: '2026-11-10', checkIn: '07:48', checkOut: '16:30', status: 'Present' },
  { id: 'AT-1009', employeeId: 'EMP-009', name: 'Bayu Setiawan', department: 'Warehouse', date: '2026-11-10', checkIn: '07:05', checkOut: '16:00', status: 'Present' },
  { id: 'AT-1010', employeeId: 'EMP-010', name: 'Nadia Kirana', department: 'IT', date: '2026-11-10', checkIn: '08:41', checkOut: '17:25', status: 'Late' },
  { id: 'AT-1011', employeeId: 'EMP-011', name: 'Kevin Tanaka', department: 'Production', date: '2026-11-10', checkIn: '06:58', checkOut: '15:52', status: 'Present' },
  { id: 'AT-1012', employeeId: 'EMP-012', name: 'Grace Hutagalung', department: 'Finance', date: '2026-11-10', checkIn: '—', checkOut: '—', status: 'Leave' },
]
