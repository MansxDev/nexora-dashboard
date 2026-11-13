import { useMemo, useState } from 'react'
import { Download, Wallet, Banknote, Clock, FileSpreadsheet } from 'lucide-react'
import { PageHeader } from '../../components/layout/PageHeader'
import { Card, CardHeader } from '../../components/ui/Card'
import { StatTile } from '../../components/dashboard/StatTile'
import { Badge, statusTone } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { SearchInput, Select } from '../../components/ui/Input'
import { DataTable } from '../../components/tables/DataTable'
import type { Column } from '../../components/tables/DataTable'
import { payrollHistory, payrollRecords, payrollSummary } from '../../data/payroll'
import { toCsv, downloadCsv } from '../../utils/csv'
import { formatCurrency, formatDate, formatNumber } from '../../utils/format'
import type { PayrollRecord } from '../../types'
import { useTranslation } from 'react-i18next'

const columnsSalary: Column<PayrollRecord>[] = [
  { key: 'employeeName', header: 'Employee', sortable: true },
  { key: 'department', header: 'Department', sortable: true },
  { key: 'period', header: 'Period', sortable: true },
  { key: 'basic', header: 'Basic', sortable: true, align: 'right', render: (r) => <span className="whitespace-nowrap tabular-nums">{formatCurrency(r.basic)}</span> },
  { key: 'allowance', header: 'Allowance', align: 'right', render: (r) => <span className="whitespace-nowrap tabular-nums">{formatCurrency(r.allowance)}</span> },
  { key: 'deduction', header: 'Deduction', align: 'right', render: (r) => <span className="whitespace-nowrap tabular-nums">−{formatCurrency(r.deduction)}</span> },
  { key: 'net', header: 'Net Pay', sortable: true, align: 'right', render: (r) => <span className="whitespace-nowrap font-semibold tabular-nums text-slate-900 dark:text-slate-100">{formatCurrency(r.net)}</span> },
  { key: 'status', header: 'Status', align: 'right', render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
]

export function PayrollPage() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<string>('All')

  const salaryRows = useMemo(
    () =>
      payrollRecords.filter(
        (r) =>
          (status === 'All' || r.status === status) &&
          `${r.employeeName} ${r.department}`.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [search, status],
  )

  function exportCsv() {
    const csv = toCsv(salaryRows, [
      { header: 'Employee', value: (r) => r.employeeName },
      { header: 'Department', value: (r) => r.department },
      { header: 'Period', value: (r) => r.period },
      { header: 'Basic', value: (r) => r.basic },
      { header: 'Allowance', value: (r) => r.allowance },
      { header: 'Deduction', value: (r) => r.deduction },
      { header: 'Net', value: (r) => r.net },
      { header: 'Status', value: (r) => r.status },
    ])
    downloadCsv('nexora-payroll.csv', csv)
  }

  return (
    <div className="min-w-0">
      <PageHeader
        title={t('Payroll')}
        description={t('Salary overview, payment status, and payroll history.')}
        actions={
          <Button size="md" variant="outline" onClick={exportCsv}>
            <Download className="h-4 w-4" />
            {t('Export CSV')}
          </Button>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile icon={Wallet} tone="blue" label={t('Total Payroll · Nov 2026')} value={formatCurrency(payrollSummary.totalThisMonth)} hint="248 employees scheduled" />
        <StatTile icon={Banknote} tone="green" label={t('Employees Paid')} value={formatNumber(payrollSummary.paid)} hint="Transferred to bank accounts" />
        <StatTile icon={Clock} tone="amber" label={t('Pending Payments')} value={formatNumber(payrollSummary.pending)} hint="Waiting for approval" />
        <StatTile icon={FileSpreadsheet} tone="slate" label={t('Processing')} value={formatNumber(payrollSummary.processing)} hint="Recalculating deductions" />
      </div>

      <div className="grid gap-4 min-w-0">
        <Card className="min-w-0">
          <CardHeader title={t('Employee Salary Table')} subtitle={t('November 2026 payroll draft')} />
          <div className="grid gap-2 px-5 pb-4 sm:grid-cols-[minmax(0,1fr)_170px]">
            <SearchInput value={search} onChange={setSearch} placeholder={t('Search employee or department...')} />
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="All">{t('All Statuses')}</option>
              <option value="Paid">{t('Paid')}</option>
              <option value="Pending">{t('Pending')}</option>
              <option value="Processing">{t('Processing')}</option>
            </Select>
          </div>
          <DataTable rows={salaryRows} columns={columnsSalary} rowKey={(r) => r.id} pageSize={8} />
        </Card>

        <Card className="min-w-0">
          <CardHeader title={t('Payroll History')} subtitle={t('Processed payroll runs, last 6 months')} />
          <DataTable
            rows={payrollHistory}
            pageSize={6}
            rowKey={(r) => r.id}
            initialSort={{ key: 'processedAt', dir: 'desc' }}
            columns={[
              { key: 'period', header: 'Period', sortable: true },
              { key: 'processedAt', header: 'Processed On', sortable: true, render: (r) => formatDate(r.processedAt) },
              { key: 'employees', header: 'Employees', align: 'right', sortable: true, render: (r) => <span className="tabular-nums">{r.employees}</span> },
              { key: 'totalAmount', header: 'Total Amount', align: 'right', sortable: true, render: (r) => <span className="whitespace-nowrap font-medium tabular-nums">{formatCurrency(r.totalAmount)}</span> },
              { key: 'status', header: 'Status', align: 'right', render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
            ]}
          />
        </Card>
      </div>
    </div>
  )
}
