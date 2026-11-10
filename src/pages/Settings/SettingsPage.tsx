import { useState } from 'react'
import type { FormEvent } from 'react'
import { Building2, User, BellRing, Moon, Sun, Check } from 'lucide-react'
import { PageHeader } from '../../components/layout/PageHeader'
import { Card, CardBody, CardHeader } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Badge } from '../../components/ui/Badge'
import { useUiStore } from '../../stores/uiStore'
import { notificationPrefKeys } from '../../types'
import type { NotificationPrefKey, Theme } from '../../types'
import { cn } from '../../utils/cn'

const prefLabels: Record<NotificationPrefKey, { title: string; detail: string }> = {
  payroll: { title: 'Payroll updates', detail: 'Run drafts, approvals, and payments' },
  inventory: { title: 'Inventory alerts', detail: 'Low stock and movement requests' },
  procurement: { title: 'Procurement', detail: 'Purchase requests needing approval' },
  system: { title: 'System notices', detail: 'Backups, updates, and maintenance' },
}

function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-6 w-10 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40',
        checked ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700',
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all',
          checked ? 'left-[20px]' : 'left-0.5',
        )}
      />
    </button>
  )
}

export function SettingsPage() {
  const companies = useUiStore((s) => s.companies)
  const activeCompanyId = useUiStore((s) => s.activeCompanyId)
  const renameCompany = useUiStore((s) => s.renameCompany)
  const theme = useUiStore((s) => s.theme)
  const setTheme = useUiStore((s) => s.setTheme)
  const prefs = useUiStore((s) => s.prefs)
  const setPref = useUiStore((s) => s.setPref)

  const active = companies.find((c) => c.id === activeCompanyId) ?? companies[0]

  const [companyName, setCompanyName] = useState(active.name)
  const [companyEmail, setCompanyEmail] = useState('admin@nexora.io')
  const [companyPhone, setCompanyPhone] = useState('+62 21 5561 0000')
  const [companySaved, setCompanySaved] = useState(false)

  const [userName, setUserName] = useState('Administrator')
  const [userEmail, setUserEmail] = useState('administrator@nexora.io')
  const [userSaved, setUserSaved] = useState(false)

  function saveCompany(e: FormEvent) {
    e.preventDefault()
    if (!companyName.trim()) return
    renameCompany(activeCompanyId, companyName.trim())
    setCompanySaved(true)
    setTimeout(() => setCompanySaved(false), 2500)
  }

  function saveUser(e: FormEvent) {
    e.preventDefault()
    if (!userName.trim()) return
    setUserSaved(true)
    setTimeout(() => setUserSaved(false), 2500)
  }

  const themeOptions: Array<{ id: Theme; label: string; icon: typeof Sun; hint: string }> = [
    { id: 'light', label: 'Light', icon: Sun, hint: 'Bright workplace' },
    { id: 'dark', label: 'Dark', icon: Moon, hint: 'Low-light comfort' },
  ]

  return (
    <div className="min-w-0">
      <PageHeader title="Settings" description="Company profile, personal preferences, and workspace appearance." />

      <div className="grid min-w-0 gap-4 xl:grid-cols-2">
        <Card className="min-w-0">
          <CardHeader
            title="Company Profile"
            subtitle="Showing on invoices, reports, and exports"
            action={<Badge tone="info">{active.name === companyName ? 'Current' : 'Edited'}</Badge>}
          />
          <CardBody>
            <form onSubmit={saveCompany} className="grid gap-3.5 sm:grid-cols-2">
              <Input label="Company name" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="sm:col-span-2" />
              <Input label="Billing email" type="email" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} />
              <Input label="Phone" value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} />
              <div className="flex items-center gap-3 sm:col-span-2">
                <Button type="submit" size="sm">
                  <Building2 className="h-3.5 w-3.5" />
                  Save changes
                </Button>
                {companySaved ? (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                    <Check className="h-3.5 w-3.5" />
                    Saved
                  </span>
                ) : null}
              </div>
            </form>
          </CardBody>
        </Card>

        <Card className="min-w-0">
          <CardHeader title="User Profile" subtitle="Your account within this workspace" />
          <CardBody>
            <form onSubmit={saveUser} className="grid gap-3.5 sm:grid-cols-2">
              <Input label="Display name" required value={userName} onChange={(e) => setUserName(e.target.value)} />
              <Input label="Email" type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
              <div className="flex items-center gap-3 sm:col-span-2">
                <Button type="submit" size="sm">
                  <User className="h-3.5 w-3.5" />
                  Save profile
                </Button>
                {userSaved ? (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                    <Check className="h-3.5 w-3.5" />
                    Saved
                  </span>
                ) : null}
              </div>
            </form>
          </CardBody>
        </Card>

        <Card className="min-w-0">
          <CardHeader title="Appearance" subtitle="Applies immediately and persists across sessions" />
          <CardBody>
            <div className="grid grid-cols-2 gap-3">
              {themeOptions.map(({ id, label, icon: Icon, hint }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTheme(id)}
                  aria-pressed={theme === id}
                  className={cn(
                    'flex items-center gap-3 rounded-xl border p-3.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40',
                    theme === id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                      : 'border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700',
                  )}
                >
                  <div
                    className={cn(
                      'grid h-9 w-9 shrink-0 place-items-center rounded-lg',
                      theme === id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className={cn('text-sm font-semibold', theme === id ? 'text-blue-700 dark:text-blue-300' : 'text-slate-800 dark:text-slate-100')}>{label}</p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">{hint}</p>
                  </div>
                </button>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="min-w-0">
          <CardHeader title="Notification Preferences" subtitle="Choose the alert categories you want to receive" />
          <CardBody>
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {notificationPrefKeys.map((key) => (
                <li key={key} className="flex items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{prefLabels[key].title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{prefLabels[key].detail}</p>
                  </div>
                  <Switch checked={prefs[key]} onChange={(v) => setPref(key, v)} label={prefLabels[key].title} />
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
              <BellRing className="h-3.5 w-3.5" />
              Preferences are stored in this browser (localStorage).
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
