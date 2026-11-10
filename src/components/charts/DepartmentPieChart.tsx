import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { DepartmentSlice } from '../../types'
import { useUiStore } from '../../stores/uiStore'
import { chartPalette } from './chartTheme'

/** Donut chart without embedded labels — legend renders as HTML beside it. */
export function DepartmentPieChart({ data }: { data: DepartmentSlice[] }) {
  const theme = useUiStore((s) => s.theme)
  const p = chartPalette(theme)
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row">
      <div className="relative w-full max-w-[220px] sm:max-w-[200px]">
        <ResponsiveContainer width="100%" height={210}>
          <PieChart>
            <Tooltip contentStyle={p.tooltipStyle} itemStyle={p.tooltipItem} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={62}
              outerRadius={92}
              paddingAngle={3}
              strokeWidth={0}
            >
              {data.map((slice, i) => (
                <Cell key={slice.name} fill={p.slices[i % p.slices.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">{total}</span>
          <span className="text-[11px] font-medium tracking-wide text-slate-400 uppercase">Employees</span>
        </div>
      </div>
      <ul className="w-full flex-1 space-y-2.5">
        {data.map((slice, i) => (
          <li key={slice.name} className="flex items-center gap-2.5 text-sm">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: p.slices[i % p.slices.length] }}
            />
            <span className="flex-1 text-slate-600 dark:text-slate-300">{slice.name}</span>
            <span className="font-medium tabular-nums text-slate-900 dark:text-slate-100">{slice.value}</span>
            <span className="w-10 text-right text-xs text-slate-400 tabular-nums">
              {Math.round((slice.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
