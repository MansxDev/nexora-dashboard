import type { Theme } from '../../types'

interface Palette {
  grid: string
  tick: string
  tooltipStyle: {
    background: string
    border: string
    borderRadius: number
    fontSize: number
    boxShadow: string
  }
  tooltipLabel: { color: string; fontWeight: number; fontSize: number }
  tooltipItem: { color: string; fontSize: number; padding: string }
  cursor: { stroke: string; strokeDasharray: string }
  attendance: { present: string; absent: string; late: string }
  stock: { stockIn: string; stockOut: string }
  slices: string[]
}

/** Shared chart theme: palette follows light/dark store state. */
export function chartPalette(theme: Theme): Palette {
  const dark = theme === 'dark'
  return {
    grid: dark ? '#1E293B' : '#F1F5F9',
    tick: dark ? '#94A3B8' : '#64748B',
    tooltipStyle: {
      background: dark ? '#0F172A' : '#FFFFFF',
      border: dark ? '1px solid #1E293B' : '1px solid #E2E8F0',
      borderRadius: 10,
      fontSize: 12,
      boxShadow: '0 4px 12px rgba(15,23,42,0.10)',
    },
    tooltipLabel: { color: dark ? '#F8FAFC' : '#0F172A', fontWeight: 600, fontSize: 12 },
    tooltipItem: { color: dark ? '#94A3B8' : '#64748B', fontSize: 12, padding: '2px 0' },
    cursor: { stroke: dark ? '#334155' : '#CBD5E1', strokeDasharray: '4 4' },
    attendance: { present: '#2563EB', absent: '#DC2626', late: '#D97706' },
    stock: { stockIn: '#2563EB', stockOut: '#0EA5E9' },
    slices: ['#2563EB', '#10B981', '#D97706', '#8B5CF6', '#06B6D4'],
  }
}
