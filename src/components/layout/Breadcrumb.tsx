import { ChevronRight } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { findNav } from './nav'
import { useTranslation } from 'react-i18next'

export function Breadcrumb() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const found = findNav(pathname)

  return (
    <nav aria-label={t('Breadcrumb')} className="hidden min-w-0 items-center gap-2 text-sm md:flex">
      <span className="shrink-0 text-slate-400 dark:text-slate-500">{t('Dashboard')}</span>
      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300 dark:text-slate-600" />
      {found ? (
        <>
          <span className="shrink-0 text-slate-400 dark:text-slate-500">{t(found.section)}</span>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300 dark:text-slate-600" />
        </>
      ) : null}
      <span className="min-w-0 truncate font-medium text-slate-700 dark:text-slate-200">
        {found ? t(found.item.label) : t('Overview')}
      </span>
    </nav>
  )
}
