export interface CsvColumn<T> {
  header: string
  value: (row: T) => string | number
}

/** Escape a single cell per RFC 4180 (quotes, commas, newlines). */
function escapeCell(value: string | number): string {
  const s = String(value ?? '')
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

/** Build a valid CSV string from rows + typed columns. */
export function toCsv<T>(rows: T[], columns: CsvColumn<T>[]): string {
  const head = columns.map((c) => escapeCell(c.header)).join(',')
  const body = rows.map((row) => columns.map((c) => escapeCell(c.value(row))).join(','))
  return [head, ...body].join('\r\n')
}

/** Trigger a browser download of a CSV file (UTF-8 BOM for Excel). */
export function downloadCsv(filename: string, csv: string): void {
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
