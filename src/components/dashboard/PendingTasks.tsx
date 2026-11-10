import { useNavigate } from 'react-router-dom'
import { CalendarX2, PackageSearch, Warehouse, UserSearch, ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { PendingTask } from '../../types'
import { formatNumber } from '../../utils/format'

const categoryIcon: Record<PendingTask['category'], LucideIcon> = {
  'Leave Request': CalendarX2,
  'Low Stock': PackageSearch,
  'Inventory Transaction': Warehouse,
  'Employee Data': UserSearch,
}

export function PendingTasks({ tasks }: { tasks: PendingTask[] }) {
  const navigate = useNavigate()

  return (
    <ul className="space-y-1">
      {tasks.map((task) => {
        const Icon = categoryIcon[task.category]
        return (
          <li key={task.id}>
            <button
              type="button"
              onClick={() => navigate(task.href)}
              className="group flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-slate-800 dark:text-slate-100">{task.title}</p>
                <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{task.detail}</p>
              </div>
              <span className="shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700 tabular-nums dark:bg-blue-500/10 dark:text-blue-400">
                {formatNumber(task.count)}
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-slate-500 dark:text-slate-600" />
            </button>
          </li>
        )
      })}
    </ul>
  )
}
