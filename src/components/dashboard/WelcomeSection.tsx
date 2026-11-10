import { Download } from 'lucide-react'
import { useUiStore } from '../../stores/uiStore'
import { CompanySelector } from '../layout/CompanySelector'
import { Button } from '../ui/Button'
import { toCsv, downloadCsv } from '../../utils/csv'
import { greeting, todayLabel } from '../../utils/format'
import { overviewStats } from '../../data/dashboard'

export function WelcomeSection() {
  const companies = useUiStore((s) => s.companies)
  const activeCompanyId = useUiStore((s) => s.activeCompanyId)
  const active = companies.find((c) => c.id === activeCompanyId)

  function exportReport() {
    const csv = toCsv(overviewStats, [
      { header: 'Metric', value: (s) => s.label },
      { header: 'Value', value: (s) => s.value },
      { header: 'Change (%)', value: (s) => s.change },
      { header: 'Period', value: (s) => s.period },
    ])
    downloadCsv('nexora-overview-report.csv', csv)
  }

  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          {greeting()}, Administrator
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Here's what's happening with your organization today.
        </p>
        <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {todayLabel()}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <CompanySelector />
        <Button size="md" onClick={exportReport}>
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>
      <span className="sr-only">Active company: {active?.name}</span>
    </div>
  )
}
