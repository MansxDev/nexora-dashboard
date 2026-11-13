import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Button } from '../ui/Button'
import { useTranslation } from 'react-i18next'

interface PaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
}

/** Sliding window of max 5 page numbers with ellipsis markers. */
function pageList(page: number, pageCount: number): Array<number | '…'> {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i + 1)
  const out: Array<number | '…'> = []
  const start = Math.max(2, Math.min(page - 1, pageCount - 4))
  const end = Math.min(pageCount - 1, Math.max(page + 1, 5))
  out.push(1)
  if (start > 2) out.push('…')
  for (let i = start; i <= end; i++) out.push(i)
  if (end < pageCount - 1) out.push('…')
  out.push(pageCount)
  return out
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  const { t } = useTranslation()
  if (pageCount <= 1) return null
  return (
    <nav aria-label={t('Pagination')} className="flex flex-wrap items-center justify-end gap-1.5">
      <Button
        size="sm"
        variant="outline"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        aria-label={t('Previous page')}
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        {t('Prev')}
      </Button>
      {pageList(page, pageCount).map((p, i) =>
        p === '…' ? (
          <span key={`dot-${i}`} className="px-1 text-xs text-slate-400">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={cn(
              'h-8 min-w-8 rounded-lg px-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40',
              p === page
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
            )}
          >
            {p}
          </button>
        ),
      )}
      <Button
        size="sm"
        variant="outline"
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}
        aria-label={t('Next page')}
      >
        {t('Next')}
        <ChevronRight className="h-3.5 w-3.5" />
      </Button>
    </nav>
  )
}
