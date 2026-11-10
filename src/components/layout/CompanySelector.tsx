import { Building2, Check, ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'
import { useUiStore } from '../../stores/uiStore'
import { Dropdown, DropdownItem, DropdownLabel, useDropdownClose } from '../ui/Dropdown'

interface CompanySelectorProps {
  className?: string
  /** 'pill' for toolbar use, 'block' for full-width inside content blocks. */
  variant?: 'pill' | 'block'
}

export function CompanySelector({ className, variant = 'pill' }: CompanySelectorProps) {
  const companies = useUiStore((s) => s.companies)
  const activeCompanyId = useUiStore((s) => s.activeCompanyId)
  const setActiveCompany = useUiStore((s) => s.setActiveCompany)
  const close = useDropdownClose()
  const active = companies.find((c) => c.id === activeCompanyId) ?? companies[0]

  return (
    <Dropdown
      panelClassName="w-64"
      className={className}
      trigger={
        <span
          className={cn(
            'flex h-9 items-center gap-2 rounded-lg border border-slate-200 pl-2.5 pr-2 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50',
            'dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800',
            variant === 'block' && 'w-full justify-between',
          )}
        >
          <span className="flex min-w-0 items-center gap-2">
            <Building2 className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="max-w-[150px] truncate">{active.name}</span>
          </span>
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
        </span>
      }
    >
      <DropdownLabel>Switch company</DropdownLabel>
      {companies.map((c) => {
        const isActive = c.id === activeCompanyId
        return (
          <DropdownItem
            key={c.id}
            icon={<Building2 className="h-4 w-4" />}
            onClick={() => {
              setActiveCompany(c.id)
              close()
            }}
          >
            <span
              className={cn(
                'flex w-full items-center gap-2',
                isActive ? 'font-medium text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200',
              )}
            >
              <span className="flex-1 truncate">{c.name}</span>
              {isActive ? <Check className="h-3.5 w-3.5 shrink-0" /> : null}
            </span>
          </DropdownItem>
        )
      })}
    </Dropdown>
  )
}
