import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface TooltipProps {
  label: string
  side?: 'right' | 'bottom'
  children: ReactNode
  className?: string
}

/** CSS-only tooltip via group-hover (used for collapsed sidebar). */
export function Tooltip({ label, side = 'right', children, className }: TooltipProps) {
  return (
    <span className={cn('group/tt relative inline-flex', className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          'pointer-events-none invisible z-[60] whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-100',
          'dark:bg-slate-700',
          'group-hover/tt:visible group-hover/tt:opacity-100',
          side === 'right'
            ? 'absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2'
            : 'absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2',
        )}
      >
        {label}
      </span>
    </span>
  )
}
