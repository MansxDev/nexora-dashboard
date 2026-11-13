import type { LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '../../utils/cn'

type Tone = 'blue' | 'green' | 'amber' | 'rose' | 'slate'

const iconTone: Record<Tone, string> = {
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  green: 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  rose: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
  slate: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
}

interface StatTileProps {
  icon: LucideIcon
  tone?: Tone
  label: string
  value: string | number
  hint?: string
  className?: string
}

/** Compact stat tile used by secondary pages (Payroll, Inventory, Procurement, Analytics). */
export function StatTile({ icon: Icon, tone = 'slate', label, value, hint, className }: StatTileProps) {
  const { t } = useTranslation()
  return (
    <div
      className={cn(
        'min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)]',
        'dark:border-slate-800 dark:bg-slate-900 dark:shadow-none',
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <div className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-lg', iconTone[tone])}>
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-lg font-semibold leading-6 tracking-tight tabular-nums text-slate-900 dark:text-slate-50">{value}</p>
          <p className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">{t(label)}</p>
        </div>
      </div>
      {hint ? <p className="mt-2 truncate text-[11px] text-slate-400 dark:text-slate-500">{t(hint)}</p> : null}
    </div>
  )
}
