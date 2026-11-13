import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '../../utils/cn'

export type BadgeTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

const toneClasses: Record<BadgeTone, string> = {
  success: 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400',
  warning: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  danger: 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400',
  info: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  neutral: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
}

export function Badge({ tone = 'neutral', className, children }: { tone?: BadgeTone; className?: string; children: ReactNode }) {
  const { t } = useTranslation()
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium',
        toneClasses[tone],
        className,
      )}
    >
      {typeof children === 'string' ? t(children) : children}
    </span>
  )
}

/** Map a domain status string to a badge tone (shared across pages). */
export function statusTone(status: string): BadgeTone {
  switch (status) {
    case 'Active':
    case 'Present':
    case 'Paid':
    case 'Approved':
      return 'success'
    case 'Probation':
    case 'Late':
    case 'Pending':
    case 'Processing':
      return 'warning'
    case 'Absent':
    case 'Rejected':
    case 'Resigned':
      return 'danger'
    case 'On Leave':
    case 'Leave':
    case 'Ordered':
      return 'info'
    default:
      return 'neutral'
  }
}
