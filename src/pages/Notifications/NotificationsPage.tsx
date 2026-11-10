import { useMemo, useState } from 'react'
import { BellOff, CheckCheck } from 'lucide-react'
import { PageHeader } from '../../components/layout/PageHeader'
import { Card, CardHeader } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import { useUiStore } from '../../stores/uiStore'
import type { NotificationKind } from '../../types'
import { cn } from '../../utils/cn'

const kindDotColor: Record<NotificationKind, string> = {
  payroll: 'bg-blue-500',
  inventory: 'bg-amber-500',
  procurement: 'bg-violet-500',
  attendance: 'bg-green-500',
  system: 'bg-slate-400',
}

const kindLabel: Record<NotificationKind, string> = {
  payroll: 'Payroll',
  inventory: 'Inventory',
  procurement: 'Procurement',
  attendance: 'Attendance',
  system: 'System',
}

const views = ['All', 'Unread'] as const

export function NotificationsPage() {
  const notifications = useUiStore((s) => s.notifications)
  const markRead = useUiStore((s) => s.markNotificationRead)
  const markAll = useUiStore((s) => s.markAllNotificationsRead)
  const [view, setView] = useState<(typeof views)[number]>('All')

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications])
  const visible = view === 'Unread' ? notifications.filter((n) => !n.read) : notifications

  return (
    <div className="min-w-0">
      <PageHeader
        title="Notifications"
        description="Alerts from payroll, inventory, procurement, and system events."
        actions={
          <Button size="md" variant="outline" onClick={markAll} disabled={unreadCount === 0}>
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </Button>
        }
      />

      <Card className="min-w-0">
        <CardHeader
          title="Inbox"
          subtitle={unreadCount === 0 ? 'All caught up — nothing unread' : `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`}
          action={
            <div className="flex rounded-lg border border-slate-200 p-0.5 dark:border-slate-700" role="tablist" aria-label="Filter notifications">
              {views.map((v) => (
                <button
                  key={v}
                  type="button"
                  role="tab"
                  aria-selected={view === v}
                  onClick={() => setView(v)}
                  className={cn(
                    'rounded-md px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none',
                    view === v
                      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100',
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          }
        />

        {visible.length === 0 ? (
          <EmptyState
            icon={BellOff}
            title="No unread notifications"
            description="You will see new payroll, inventory, and procurement alerts here."
            className="pb-6"
          />
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {visible.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => markRead(n.id)}
                  className={cn(
                    'flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50',
                    !n.read && 'bg-blue-50/40 dark:bg-blue-500/5',
                  )}
                >
                  <span
                    className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', n.read ? 'bg-transparent' : kindDotColor[n.kind])}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className={cn('text-sm text-slate-800 dark:text-slate-100', !n.read && 'font-semibold')}>{n.title}</span>
                      <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        {kindLabel[n.kind]}
                      </span>
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-slate-500 dark:text-slate-400">{n.body}</span>
                  </span>
                  <span className="shrink-0 text-[11px] text-slate-400 dark:text-slate-500">
                    {n.read ? n.time : <span className="font-medium text-blue-600 dark:text-blue-400">unread · {n.time}</span>}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
