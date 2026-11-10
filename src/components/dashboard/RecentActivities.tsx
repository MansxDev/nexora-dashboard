import { CalendarCheck, CalendarDays, Package, UserPlus, Banknote } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ActivityKind, ActivityItem } from '../../types'
import { cn } from '../../utils/cn'

const kindMeta: Record<ActivityKind, { icon: LucideIcon; classes: string }> = {
  employee: { icon: UserPlus, classes: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' },
  attendance: { icon: CalendarCheck, classes: 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400' },
  inventory: { icon: Package, classes: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' },
  leave: { icon: CalendarDays, classes: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400' },
  payroll: { icon: Banknote, classes: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400' },
}

export function RecentActivities({ items }: { items: ActivityItem[] }) {
  return (
    <ol className="relative space-y-1">
      {items.map((item, index) => {
        const { icon: Icon, classes } = kindMeta[item.kind]
        const last = index === items.length - 1
        return (
          <li key={item.id} className="relative flex gap-3 py-2 pl-1 pr-2">
            {!last ? (
              <span className="absolute left-[22px] top-11 bottom-0 w-px bg-slate-200 dark:bg-slate-800" aria-hidden="true" />
            ) : null}
            <div className={cn('z-10 grid h-9 w-9 shrink-0 place-items-center rounded-lg', classes)}>
              <Icon className="h-4 w-4" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-slate-800 dark:text-slate-100">{item.title}</p>
              <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{item.detail}</p>
            </div>
            <span className="shrink-0 text-[11px] text-slate-400 dark:text-slate-500">{item.time}</span>
          </li>
        )
      })}
    </ol>
  )
}
