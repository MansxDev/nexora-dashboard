import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '../../utils/cn'

const LOCALES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'id', label: 'Bahasa Indonesia', short: 'ID' },
] as const

/**
 * Tombol ganti bahasa EN ⇄ ID.
 * Nilai aktif disimpan di localStorage ('nexora.locale') oleh i18next detector,
 * jadi pilihan pengguna bertahan setelah reload.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const { i18n, t } = useTranslation()
  const current = i18n.resolvedLanguage?.startsWith('id') ? 'id' : 'en'
  const next = current === 'en' ? 'id' : 'en'
  const nextLabel = LOCALES.find((l) => l.code === next)?.label ?? 'English'

  return (
    <button
      type="button"
      onClick={() => i18n.changeLanguage(next)}
      title={t('Switch to {{language}}', { language: t(nextLabel) })}
      aria-label={t('Switch language to {{language}}', { language: t(nextLabel) })}
      className={cn(
        'inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold uppercase tracking-wide',
        'text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700',
        'dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200',
        className,
      )}
    >
      <Languages className="h-[18px] w-[18px]" />
      {current === 'en' ? 'EN' : 'ID'}
    </button>
  )
}
