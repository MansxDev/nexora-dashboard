import { NavLink } from 'react-router-dom'
import { ChevronsLeft, ChevronsRight, X } from 'lucide-react'
import { cn } from '../../utils/cn'
import { useUiStore } from '../../stores/uiStore'
import { Tooltip } from '../ui/Tooltip'
import { navSections } from './nav'
import type { NavItem } from './nav'

const itemBase =
  'flex h-9 items-center gap-3 rounded-lg px-3 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40'
const itemIdle =
  'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
const itemActive = 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'

function NavLists({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  return (
    <nav className="flex-1 overflow-y-auto px-3 pb-2 pt-1" aria-label="Main navigation">
      {navSections.map((section) => (
        <div key={section.title} className="mb-1">
          {collapsed ? (
            <div className="mx-2 my-3 border-t border-slate-200 dark:border-slate-800" />
          ) : (
            <p className="px-3 pt-4 pb-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              {section.title}
            </p>
          )}
          {section.items.map((item: NavItem) => {
            const link = (
              <NavLink
                to={item.to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(itemBase, itemIdle, isActive && itemActive, collapsed && 'justify-center px-0')
                }
              >
                <item.icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                {!collapsed ? <span className="truncate">{item.label}</span> : null}
              </NavLink>
            )
            return collapsed ? (
              <Tooltip key={item.to} label={item.label} className="w-full">
                {link}
              </Tooltip>
            ) : (
              <div key={item.to}>{link}</div>
            )
          })}
        </div>
      ))}
    </nav>
  )
}

function Brand({ collapsed }: { collapsed: boolean }) {
  return (
    <div className={cn('flex items-center gap-2.5 px-5 py-4', collapsed && 'px-4')}>
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-[0_1px_2px_rgba(37,99,235,0.4)]">
        N
      </div>
      {!collapsed ? (
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50">NEXORA</p>
          <p className="text-[10px] font-semibold tracking-[0.22em] text-slate-400 dark:text-slate-500">SYSTEMS</p>
        </div>
      ) : null}
    </div>
  )
}

function CollapseButton({ collapsed, onClick }: { collapsed: boolean; onClick: () => void }) {
  const button = (
    <button
      type="button"
      onClick={onClick}
      className={cn(itemBase, itemIdle, 'w-full', collapsed && 'justify-center px-0')}
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    >
      {collapsed ? <ChevronsRight className="h-[18px] w-[18px]" /> : <ChevronsLeft className="h-[18px] w-[18px]" />}
      {!collapsed ? <span>Collapse</span> : null}
    </button>
  )
  return <div className="border-t border-slate-200 p-3 dark:border-slate-800">{collapsed ? <Tooltip label="Expand">{button}</Tooltip> : button}</div>
}

export function Sidebar() {
  const collapsed = useUiStore((s) => s.sidebarCollapsed)
  const toggleSidebar = useUiStore((s) => s.toggleSidebar)
  const mobileOpen = useUiStore((s) => s.mobileDrawerOpen)
  const setMobileDrawer = useUiStore((s) => s.setMobileDrawer)

  return (
    <>
      {/* Desktop */}
      <aside
        className={cn(
          'sticky top-0 z-20 hidden h-dvh shrink-0 flex-col border-r border-slate-200 bg-white transition-[width] duration-200',
          'dark:border-slate-800 dark:bg-slate-900 lg:flex',
          collapsed ? 'w-[68px]' : 'w-60',
        )}
      >
        <Brand collapsed={collapsed} />
        <NavLists collapsed={collapsed} />
        <CollapseButton collapsed={collapsed} onClick={toggleSidebar} />
      </aside>

      {/* Mobile drawer */}
      <div className={cn('fixed inset-0 z-50 lg:hidden', mobileOpen ? 'pointer-events-auto' : 'pointer-events-none')} aria-hidden={!mobileOpen}>
        <div
          className={cn(
            'absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] transition-opacity duration-200 dark:bg-black/60',
            mobileOpen ? 'opacity-100' : 'opacity-0',
          )}
          onClick={() => setMobileDrawer(false)}
        />
        <aside
          className={cn(
            'absolute inset-y-0 left-0 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-out',
            'dark:border-slate-800 dark:bg-slate-900',
            mobileOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <div className="flex items-center justify-between pr-3">
            <Brand collapsed={false} />
            <button
              type="button"
              onClick={() => setMobileDrawer(false)}
              aria-label="Close menu"
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <NavLists collapsed={false} onNavigate={() => setMobileDrawer(false)} />
        </aside>
      </div>
    </>
  )
}
