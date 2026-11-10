import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { OverviewStat } from '../../types'
import { cn } from '../../utils/cn'
import { formatNumber, formatPercent } from '../../utils/format'

type Tone = 'blue' | 'green' | 'amber' | 'rose'

const iconTone: Record<Tone, string> = {
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  green: 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  rose: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
}

interface StatCardProps {
  stat: OverviewStat
  icon: LucideIcon
  tone?: Tone
}

export function StatCard({ stat, icon: Icon, tone = 'blue' }: StatCardProps) {
  const positive = stat.change >= 0
  return (
    <div
      className={cn(
        'rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06)]',
        'transition-shadow hover:shadow-[0_4px_16px_rgba(15,23,42,0.08)]',
        'dark:border-slate-800 dark:bg-slate-900 dark:shadow-none dark:hover:shadow-none',
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn('grid h-10 w-10 place-items-center rounded-lg', iconTone[tone])}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <span
          className={cn(
            'inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold',
            positive
              ? 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400'
              : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400',
          )}
        >
          {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {formatPercent(stat.change)}
        </span>
      </div>
      <p className="mt-4 text-3xl font-semibold tracking-tight tabular-nums text-slate-900 dark:text-slate-50">
        {formatNumber(stat.value)}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">{stat.label}</p>
      <p className="text-xs text-slate-400 dark:text-slate-500">{stat.period}</p>
    </div>
  )
}
