import { useNavigate } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { cn } from '../../utils/cn'
import { useUiStore, unreadCount } from '../../stores/uiStore'
import { Dropdown } from '../ui/Dropdown'

const kindColor: Record<string, string> = {
  payroll: 'bg-blue-500',
  inventory: 'bg-amber-500',
  procurement: 'bg-violet-500',
  attendance: 'bg-green-500',
  system: 'bg-slate-400',
}

export function NotificationBell() {
  const notifications = useUiStore((s) => s.notifications)
  const markAll = useUiStore((s) => s.markAllNotificationsRead)
  const unread = useUiStore(unreadCount)
  const navigate = useNavigate()

  return (
    <Dropdown
      panelClassName="w-80"
      trigger={
        <span className="relative grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200">
          <Bell className="h-[18px] w-[18px]" />
          {unread > 0 ? (
            <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-semibold text-white">
              {unread}
            </span>
          ) : null}
        </span>
      }
    >
      <div className="flex items-center justify-between px-2.5 py-1.5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Notifications</p>
        <button
          type="button"
          onClick={markAll}
          disabled={unread === 0}
          className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 disabled:cursor-default disabled:opacity-40 dark:text-blue-400"
        >
          Mark all as read
        </button>
      </div>
      <div className="my-1 border-t border-slate-200 dark:border-slate-800" />
      {notifications.slice(0, 4).map((n) => (
        <button
          key={n.id}
          type="button"
          onClick={() => {
            navigate('/notifications')
          }}
          className="flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <span className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', n.read ? 'bg-slate-200 dark:bg-slate-700' : kindColor[n.kind] ?? 'bg-blue-500')} />
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-medium text-slate-800 dark:text-slate-100">{n.title}</span>
            <span className="block truncate text-xs text-slate-500 dark:text-slate-400">{n.body}</span>
            <span className="mt-0.5 block text-[11px] text-slate-400 dark:text-slate-500">{n.time}</span>
          </span>
        </button>
      ))}
      <div className="my-1 border-t border-slate-200 dark:border-slate-800" />
      <button
        type="button"
        onClick={() => navigate('/notifications')}
        className="w-full rounded-lg px-2.5 py-2 text-center text-xs font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10"
      >
        View all notifications
      </button>
    </Dropdown>
  )
}
