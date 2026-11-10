import { useId } from 'react'
import type { InputHTMLAttributes, SelectHTMLAttributes } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, className, ...rest }: InputProps) {
  const id = useId()
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label ? (
        <label htmlFor={id} className="text-xs font-medium text-slate-600 dark:text-slate-300">
          {label}
        </label>
      ) : null}
      <input
        id={label ? id : undefined}
        className={cn(
          'h-9 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400',
          'transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20',
          'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500',
          className,
        )}
        {...rest}
      />
    </div>
  )
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
}

export function Select({ label, className, children, ...rest }: SelectProps) {
  const id = useId()
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label ? (
        <label htmlFor={id} className="text-xs font-medium text-slate-600 dark:text-slate-300">
          {label}
        </label>
      ) : null}
      <div className="relative">
        <select
          id={label ? id : undefined}
          className={cn(
            'h-9 w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 pr-8 text-sm text-slate-900',
            'transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20',
            'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100',
            className,
          )}
          {...rest}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  )
}

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchInput({ value, onChange, placeholder = 'Search...', className }: SearchInputProps) {
  return (
    <div className={cn('relative w-full', className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'h-9 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400',
          'transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20',
          'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500',
        )}
      />
    </div>
  )
}
