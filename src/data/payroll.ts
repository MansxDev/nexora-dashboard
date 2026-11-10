import type { PayrollHistoryRow, PayrollRecord } from '../types'

export const payrollSummary = {
  totalThisMonth: 326000,
  paid: 232,
  pending: 14,
  processing: 2,
}

export const payrollRecords: PayrollRecord[] = [
  { id: 'RW-5001', employeeName: 'Andi Prasetyo', department: 'Production', period: 'November 2026', basic: 5200, allowance: 900, deduction: 350, net: 5750, status: 'Pending' },
  { id: 'RW-5002', employeeName: 'Bunga Maharani', department: 'HR', period: 'November 2026', basic: 4300, allowance: 700, deduction: 280, net: 4720, status: 'Pending' },
  { id: 'RW-5003', employeeName: 'Dewi Anggraini', department: 'Finance', period: 'November 2026', basic: 6100, allowance: 1100, deduction: 420, net: 6780, status: 'Processing' },
  { id: 'RW-5004', employeeName: 'Fajar Nugroho', department: 'Warehouse', period: 'November 2026', basic: 3800, allowance: 650, deduction: 240, net: 4210, status: 'Paid' },
  { id: 'RW-5005', employeeName: 'Jonathan Wijaya', department: 'Finance', period: 'November 2026', basic: 4600, allowance: 800, deduction: 300, net: 5100, status: 'Paid' },
  { id: 'RW-5006', employeeName: 'Siti Halimah', department: 'Production', period: 'November 2026', basic: 4100, allowance: 720, deduction: 290, net: 4530, status: 'Paid' },
  { id: 'RW-5007', employeeName: 'Nadia Kirana', department: 'IT', period: 'November 2026', basic: 5600, allowance: 950, deduction: 380, net: 6170, status: 'Processing' },
  { id: 'RW-5008', employeeName: 'Kevin Tanaka', department: 'Production', period: 'November 2026', basic: 3900, allowance: 680, deduction: 260, net: 4320, status: 'Pending' },
]

export const payrollHistory: PayrollHistoryRow[] = [
  { id: 'RUN-8007', period: 'October 2026', processedAt: '2026-10-30', employees: 248, totalAmount: 318400, status: 'Paid' },
  { id: 'RUN-8006', period: 'September 2026', processedAt: '2026-09-30', employees: 245, totalAmount: 306100, status: 'Paid' },
  { id: 'RUN-8005', period: 'August 2026', processedAt: '2026-08-31', employees: 241, totalAmount: 299800, status: 'Paid' },
  { id: 'RUN-8004', period: 'July 2026', processedAt: '2026-07-31', employees: 236, totalAmount: 291300, status: 'Paid' },
  { id: 'RUN-8003', period: 'June 2026', processedAt: '2026-06-30', employees: 231, totalAmount: 284700, status: 'Paid' },
  { id: 'RUN-8002', period: 'May 2026', processedAt: '2026-05-31', employees: 228, totalAmount: 278200, status: 'Paid' },
]
