import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { AttendancePoint } from '../../types'
import { useUiStore } from '../../stores/uiStore'
import { useTranslation } from 'react-i18next'
import { chartPalette } from './chartTheme'

export function AttendanceLineChart({ data }: { data: AttendancePoint[] }) {
  const { t } = useTranslation()
  const theme = useUiStore((s) => s.theme)
  const p = chartPalette(theme)

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke={p.grid} strokeDasharray="0" vertical={false} />
        <XAxis dataKey="day" tickFormatter={(d: string) => t(d)} tick={{ fill: p.tick, fontSize: 12 }} axisLine={false} tickLine={false} dy={8} />
        <YAxis tick={{ fill: p.tick, fontSize: 12 }} axisLine={false} tickLine={false} width={36} />
        <Tooltip
          contentStyle={p.tooltipStyle}
          labelStyle={p.tooltipLabel}
          itemStyle={p.tooltipItem}
          cursor={p.cursor}
        />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
        <Line type="monotone" dataKey="present" name={t('Present')} stroke={p.attendance.present} strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
        <Line type="monotone" dataKey="late" name={t('Late')} stroke={p.attendance.late} strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
        <Line type="monotone" dataKey="absent" name={t('Absent')} stroke={p.attendance.absent} strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
