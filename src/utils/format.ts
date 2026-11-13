import i18n from '../i18n/config'

/**
 * Helper format angka/tanggal.
 * Locale mengikuti bahasa aktif (en → en-US, id → id-ID),
 * jadi pemisah ribuan dan nama bulan ikut berubah saat bahasa diganti.
 */
function locale(): string {
  return i18n.resolvedLanguage?.startsWith('id') ? 'id-ID' : 'en-US'
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat(locale()).format(n)
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat(locale(), {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}

export function formatPercent(n: number): string {
  return `${n > 0 ? '+' : ''}${n.toFixed(1)}%`
}

export function formatDate(iso: string): string {
  const d = new Date(iso)
  return new Intl.DateTimeFormat(locale(), {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(d)
}

export function clockNow(): string {
  return new Date().toLocaleTimeString(locale(), { hour: '2-digit', minute: '2-digit' })
}

/** "Andi Prasetyo" → "AP" (avatar fallback initials). */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

/** "Tuesday, 10 November 2026" / "Selasa, 10 November 2026" */
export function todayLabel(date = new Date()): string {
  return new Intl.DateTimeFormat(locale(), {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

/** Sapaan waktu, diterjemahkan lewat i18next. */
export function greeting(date = new Date()): string {
  const h = date.getHours()
  if (h < 12) return i18n.t('Good morning')
  if (h < 17) return i18n.t('Good afternoon')
  return i18n.t('Good evening')
}
