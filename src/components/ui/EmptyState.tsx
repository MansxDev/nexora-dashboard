import type { LucideIcon } from 'lucide-react'
import { cn } from '../../utils/cn'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  className?: string
}

export function EmptyState({ icon: Icon, title, description, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center px-6 py-10 text-center', className)}>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">{title}</p>
      {description ? <p className="mt-1 max-w-xs text-xs text-slate-500 dark:text-slate-400">{description}</p> : null}
    </div>
  )
}
