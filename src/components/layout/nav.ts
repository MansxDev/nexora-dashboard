import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  ChartColumn,
  Users,
  CalendarCheck,
  Wallet,
  Package,
  ShoppingCart,
  FileText,
  Bell,
  Settings,
} from 'lucide-react'

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const navSections: NavSection[] = [
  {
    title: 'General',
    items: [
      { label: 'Overview', to: '/overview', icon: LayoutDashboard },
      { label: 'Analytics', to: '/analytics', icon: ChartColumn },
    ],
  },
  {
    title: 'Management',
    items: [
      { label: 'Employees', to: '/employees', icon: Users },
      { label: 'Attendance', to: '/attendance', icon: CalendarCheck },
      { label: 'Payroll', to: '/payroll', icon: Wallet },
      { label: 'Inventory', to: '/inventory', icon: Package },
      { label: 'Procurement', to: '/procurement', icon: ShoppingCart },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Reports', to: '/reports', icon: FileText },
      { label: 'Notifications', to: '/notifications', icon: Bell },
      { label: 'Settings', to: '/settings', icon: Settings },
    ],
  },
]

export function findNav(path: string): { section: string; item: NavItem } | null {
  for (const section of navSections) {
    const item = section.items.find((i) => i.to === path)
    if (item) return { section: section.title, item }
  }
  return null
}
