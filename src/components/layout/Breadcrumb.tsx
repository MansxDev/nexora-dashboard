import { ChevronRight } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { findNav } from './nav'

export function Breadcrumb() {
  const { pathname } = useLocation()
  const found = findNav(pathname)

  return (
    <nav aria-label="Breadcrumb" className="hidden min-w-0 items-center gap-2 text-sm md:flex">
      <span className="shrink-0 text-slate-400 dark:text-slate-500">Dashboard</span>
      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300 dark:text-slate-600" />
      {found ? (
        <>
          <span className="shrink-0 text-slate-400 dark:text-slate-500">{found.section}</span>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300 dark:text-slate-600" />
        </>
      ) : null}
      <span className="min-w-0 truncate font-medium text-slate-700 dark:text-slate-200">
        {found ? found.item.label : 'Overview'}
      </span>
    </nav>
  )
}
