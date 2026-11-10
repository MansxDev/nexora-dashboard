import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronDown,
  CircleHelp,
  Mail,
  Menu,
  Moon,
  Package,
  Settings,
  Sun,
  User,
} from 'lucide-react'
import { cn } from '../../utils/cn'
import { useUiStore, unreadCount } from '../../stores/uiStore'
import { Dropdown, DropdownItem, DropdownDivider, useDropdownClose } from '../ui/Dropdown'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Breadcrumb } from './Breadcrumb'
import { GlobalSearch } from './GlobalSearch'
import { NotificationBell } from './NotificationBell'
import { CompanySelector } from './CompanySelector'

const iconBtn =
  'grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'

function ThemeToggle() {
  const theme = useUiStore((s) => s.theme)
  const toggleTheme = useUiStore((s) => s.toggleTheme)
  return (
    <button type="button" onClick={toggleTheme} className={iconBtn} aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
      {theme === 'light' ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
    </button>
  )
}

function HelpButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={iconBtn} aria-label="Help">
        <CircleHelp className="h-[18px] w-[18px]" />
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Help & Support"
        description="NEXORA Center v1.0.0 — demo build"
        size="sm"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
              Close
            </Button>
            <a
              href="mailto:support@nexora.io"
              className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 text-xs font-medium text-white transition-colors hover:bg-blue-700"
            >
              <Mail className="h-3.5 w-3.5" />
              Contact Support
            </a>
          </>
        }
      >
        <div className="space-y-2.5 pt-1">
          <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <p className="font-medium text-slate-800 dark:text-slate-100">Quick start</p>
            <p className="mt-1 text-xs leading-relaxed">Open the sidebar to explore each module. Press Escape to close panels, and use the search box to jump between employees and inventory items.</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <p className="font-medium text-slate-800 dark:text-slate-100">Support</p>
            <p className="mt-1 text-xs leading-relaxed">For issues in this demo workspace, email support@nexora.io. Admin response window: 1 business day.</p>
          </div>
        </div>
      </Modal>
    </>
  )
}

function UserMenu() {
  const unread = useUiStore(unreadCount)
  const close = useDropdownClose()
  const navigate = useNavigate()

  function go(to: string) {
    navigate(to)
    close()
  }

  return (
    <Dropdown
      panelClassName="w-64"
      trigger={
        <span className="flex items-center gap-2.5 rounded-lg p-1 pr-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-600 text-xs font-semibold text-white">AD</span>
          <span className="hidden min-w-0 leading-tight lg:block">
            <span className="block text-[13px] font-medium text-slate-800 dark:text-slate-100">Administrator</span>
            <span className="block text-[11px] text-slate-500 dark:text-slate-400">Super Admin</span>
          </span>
          <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 lg:block" />
        </span>
      }
    >
      <div className="px-2.5 py-2">
        <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-100">Administrator</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">NEXORA Demo Company</p>
      </div>
      <DropdownDivider />
      <DropdownItem icon={<User className="h-4 w-4" />} onClick={() => go('/settings')}>
        View profile
      </DropdownItem>
      <DropdownItem icon={<Settings className="h-4 w-4" />} onClick={() => go('/settings')}>
        Preferences
      </DropdownItem>
      <DropdownItem icon={<Package className="h-4 w-4" />} onClick={() => go('/inventory')}>
        Inventory overview
      </DropdownItem>
      <DropdownDivider />
      <div className="flex items-center justify-between px-2.5 py-1.5">
        <span className="text-xs text-slate-500 dark:text-slate-400">Unread alerts</span>
        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-red-100 px-1.5 text-[11px] font-semibold text-red-700 dark:bg-red-500/15 dark:text-red-400">
          {unread}
        </span>
      </div>
    </Dropdown>
  )
}

export function Topbar() {
  const setMobileDrawer = useUiStore((s) => s.setMobileDrawer)

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 lg:px-8">
      <button
        type="button"
        onClick={() => setMobileDrawer(true)}
        aria-label="Open menu"
        className={cn(iconBtn, 'lg:hidden')}
      >
        <Menu className="h-5 w-5" />
      </button>
      <Breadcrumb />
      <div className="flex-1" />
      <GlobalSearch />
      <ThemeToggle />
      <HelpButton />
      <NotificationBell />
      <div className="mx-1 hidden h-6 w-px bg-slate-200 md:block dark:bg-slate-800" />
      <CompanySelector className="hidden md:block" />
      <UserMenu />
    </header>
  )
}
