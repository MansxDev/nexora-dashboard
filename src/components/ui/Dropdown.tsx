import { createContext, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

const DropdownCloseContext = createContext<() => void>(() => {})

/** Call from inside panel items to close the dropdown (e.g. after navigating). */
export function useDropdownClose(): () => void {
  return useContext(DropdownCloseContext)
}

interface DropdownProps {
  /** Static trigger content; wrapped into a real <button> for a11y. */
  trigger: ReactNode
  className?: string
  panelClassName?: string
  align?: 'left' | 'right'
  children: ReactNode
}

/** Generic popup menu: click toggles, outside click / Escape closes. */
export function Dropdown({ trigger, className, panelClassName, align = 'right', children }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <div className={cn('relative', className)} ref={ref}>
      <button type="button" onClick={() => setOpen((o) => !o)} className="block rounded-lg">
        {trigger}
      </button>
      {open ? (
        <DropdownCloseContext.Provider value={close}>
          <div
            className={cn(
              'absolute top-[calc(100%+6px)] z-50 w-60 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg',
              'dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/40',
              align === 'right' ? 'right-0' : 'left-0',
              panelClassName,
            )}
          >
            {children}
          </div>
        </DropdownCloseContext.Provider>
      ) : null}
    </div>
  )
}

interface DropdownItemProps {
  onClick?: () => void
  icon?: ReactNode
  danger?: boolean
  children: ReactNode
}

export function DropdownItem({ onClick, icon, danger, children }: DropdownItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors focus:outline-none',
        danger
          ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10'
          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
      )}
    >
      {icon ? <span className="mt-0.5 shrink-0 text-slate-400 dark:text-slate-500">{icon}</span> : null}
      <span className="min-w-0">{children}</span>
    </button>
  )
}

export function DropdownLabel({ children }: { children: ReactNode }) {
  return <div className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">{children}</div>
}

export function DropdownDivider() {
  return <div className="my-1 border-t border-slate-200 dark:border-slate-800" />
}
