import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Company, NotificationItem, NotificationPrefKey, NotificationPrefs, Theme } from '../types'
import { companies } from '../data/companies'
import { notificationsSeed } from '../data/notifications'
import { applyTheme } from '../utils/theme'

/** Persisted theme takes priority; otherwise follow the OS color scheme. */
function initialTheme(): Theme {
  try {
    const raw = localStorage.getItem('nexora-ui')
    const theme = raw ? (JSON.parse(raw) as { state?: { theme?: Theme } }).state?.theme : undefined
    if (theme === 'light' || theme === 'dark') return theme
  } catch {
    // Corrupted storage — fall through to system preference.
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/** Which alert categories the admin wants (persisted). */
const defaultPrefs: NotificationPrefs = { payroll: true, inventory: true, procurement: true, system: false }

interface UiState {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  mobileDrawerOpen: boolean
  setMobileDrawer: (open: boolean) => void
  notifications: NotificationItem[]
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
  companies: Company[]
  activeCompanyId: string
  setActiveCompany: (id: string) => void
  renameCompany: (id: string, name: string) => void
  prefs: NotificationPrefs
  setPref: (key: NotificationPrefKey, value: boolean) => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      theme: initialTheme(),
      toggleTheme: () =>
        set((s) => {
          const next: Theme = s.theme === 'light' ? 'dark' : 'light'
          applyTheme(next)
          return { theme: next }
        }),
      setTheme: (theme) => {
        applyTheme(theme)
        set({ theme })
      },
      sidebarCollapsed: false,
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      mobileDrawerOpen: false,
      setMobileDrawer: (open) => set({ mobileDrawerOpen: open }),
      notifications: notificationsSeed,
      markNotificationRead: (id) =>
        set((s) => ({
          notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        })),
      markAllNotificationsRead: () =>
        set((s) => ({
          notifications: s.notifications.map((n) => ({ ...n, read: true })),
        })),
      companies,
      activeCompanyId: companies[0].id,
      setActiveCompany: (id) => set({ activeCompanyId: id }),
      renameCompany: (id, name) =>
        set((s) => ({
          companies: s.companies.map((c) => (c.id === id ? { ...c, name } : c)),
        })),
      prefs: defaultPrefs,
      setPref: (key, value) => set((s) => ({ prefs: { ...s.prefs, [key]: value } })),
    }),
    {
      name: 'nexora-ui',
      partialize: (s) => ({
        theme: s.theme,
        sidebarCollapsed: s.sidebarCollapsed,
        notifications: s.notifications,
        activeCompanyId: s.activeCompanyId,
        prefs: s.prefs,
      }),
    },
  ),
)

/** Unread count selector (used by topbar badge). */
export const unreadCount = (s: { notifications: NotificationItem[] }): number =>
  s.notifications.filter((n) => !n.read).length
