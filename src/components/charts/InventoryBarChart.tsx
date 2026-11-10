import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { StockFlowPoint } from '../../types'
import { useUiStore } from '../../stores/uiStore'
import { chartPalette } from './chartTheme'

export function InventoryBarChart({ data }: { data: StockFlowPoint[] }) {
  const theme = useUiStore((s) => s.theme)
  const p = chartPalette(theme)

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} barGap={4} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke={p.grid} vertical={false} />
        <XAxis dataKey="month" tick={{ fill: p.tick, fontSize: 12 }} axisLine={false} tickLine={false} dy={8} />
        <YAxis tick={{ fill: p.tick, fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
        <Tooltip
          contentStyle={p.tooltipStyle}
          labelStyle={p.tooltipLabel}
          itemStyle={p.tooltipItem}
          cursor={{ fill: theme === 'dark' ? '#1E293B55' : '#F1F5F966' }}
        />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
        <Bar dataKey="stockIn" name="Stock In" fill={p.stock.stockIn} radius={[6, 6, 0, 0]} maxBarSize={26} />
        <Bar dataKey="stockOut" name="Stock Out" fill={p.stock.stockOut} radius={[6, 6, 0, 0]} maxBarSize={26} />
      </BarChart>
    </ResponsiveContainer>
  )
}
