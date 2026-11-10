import { useMemo, useState } from 'react'
import { Download, Package, PackageSearch, Boxes, Hourglass, Plus } from 'lucide-react'
import { PageHeader } from '../../components/layout/PageHeader'
import { Card } from '../../components/ui/Card'
import { StatTile } from '../../components/dashboard/StatTile'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { SearchInput, Select } from '../../components/ui/Input'
import { DataTable } from '../../components/tables/DataTable'
import type { Column } from '../../components/tables/DataTable'
import { inventoryItems as seed, inventoryCategories, stockFlow } from '../../data/inventory'
import { pendingTasks } from '../../data/dashboard'
import { toCsv, downloadCsv } from '../../utils/csv'
import { formatDate, formatNumber } from '../../utils/format'
import { InventoryBarChart } from '../../components/charts/InventoryBarChart'
import { AddItemModal, StockAdjustModal } from './InventoryModals'
import type { InventoryItem } from '../../types'

const allCategories = ['All', ...inventoryCategories] as const
const todayIso = () => new Date().toISOString().slice(0, 10)

export function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(seed)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('All')
  const [addOpen, setAddOpen] = useState(false)
  const [adjustTarget, setAdjustTarget] = useState<InventoryItem | null>(null)

  const stats = useMemo(
    () => ({
      totalProducts: items.length,
      lowStock: items.filter((i) => i.stock <= i.minStock).length,
      totalUnits: items.reduce((s, i) => s + i.stock, 0),
      pendingTx: pendingTasks.find((t) => t.category === 'Inventory Transaction')?.count ?? 0,
    }),
    [items],
  )

  const rows = useMemo(
    () =>
      items.filter(
        (i) =>
          (category === 'All' || i.category === category) &&
          `${i.name} ${i.sku} ${i.category}`.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [items, search, category],
  )

  function adjust(id: string, kind: 'in' | 'out', qty: number) {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              stock: kind === 'in' ? i.stock + qty : Math.max(0, i.stock - qty),
              lastUpdate: todayIso(),
            }
          : i,
      ),
    )
  }

  function addItem(item: Omit<InventoryItem, 'id' | 'lastUpdate'>) {
    setItems((prev) => [
      { ...item, id: `INV-${String(prev.length + 1).padStart(3, '0')}`, lastUpdate: todayIso() },
      ...prev,
    ])
  }

  function exportCsv() {
    const csv = toCsv(items, [
      { header: 'SKU', value: (i) => i.sku },
      { header: 'Item', value: (i) => i.name },
      { header: 'Category', value: (i) => i.category },
      { header: 'Stock', value: (i) => i.stock },
      { header: 'Min Stock', value: (i) => i.minStock },
      { header: 'Unit', value: (i) => i.unit },
      { header: 'Last Update', value: (i) => i.lastUpdate },
    ])
    downloadCsv('nexora-inventory.csv', csv)
  }

  const columns: Column<InventoryItem>[] = [
    { key: 'sku', header: 'SKU', sortable: true, render: (i) => <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{i.sku}</span> },
    { key: 'name', header: 'Item', sortable: true, render: (i) => <span className="font-medium text-slate-800 dark:text-slate-100">{i.name}</span> },
    { key: 'category', header: 'Category', sortable: true },
    {
      key: 'stock',
      header: 'Stock',
      sortable: true,
      align: 'right',
      render: (i) => (
        <span className="whitespace-nowrap tabular-nums">
          <span className="font-semibold text-slate-900 dark:text-slate-100">{formatNumber(i.stock)}</span>{' '}
          <span className="text-xs text-slate-400">{i.unit}</span>
        </span>
      ),
    },
    { key: 'minStock', header: 'Min. Stock', align: 'right', render: (i) => <span className="tabular-nums text-slate-500">{formatNumber(i.minStock)}</span> },
    {
      key: 'stockStatus',
      header: 'Status',
      sortable: true,
      sortValue: (i) => (i.stock <= i.minStock ? 0 : 1),
      render: (i) =>
        i.stock <= i.minStock ? (
          <Badge tone="danger">Low Stock</Badge>
        ) : (
          <Badge tone="success">Healthy</Badge>
        ),
    },
    { key: 'lastUpdate', header: 'Last Update', align: 'right', render: (i) => <span className="whitespace-nowrap">{formatDate(i.lastUpdate)}</span> },
    {
      key: 'adjust',
      header: 'Adjust',
      align: 'right',
      render: (i) => (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setAdjustTarget(i)}
          aria-label={`Adjust stock of ${i.name}`}
        >
          Adjust
        </Button>
      ),
    },
  ]

  return (
    <div className="min-w-0">
      <PageHeader
        title="Inventory"
        description="Track stock levels, movements, and low-stock alerts."
        actions={
          <>
            <Button variant="outline" size="md" onClick={exportCsv}>
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button size="md" onClick={() => setAddOpen(true)}>
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile icon={Boxes} tone="blue" label="Total Products" value={formatNumber(stats.totalProducts)} hint="Active SKUs" />
        <StatTile icon={PackageSearch} tone="rose" label="Low Stock Items" value={formatNumber(stats.lowStock)} hint="At or below minimum" />
        <StatTile icon={Package} tone="green" label="Total Units" value={formatNumber(stats.totalUnits)} hint="Across all SKUs" />
        <StatTile icon={Hourglass} tone="amber" label="Pending Transactions" value={formatNumber(stats.pendingTx)} hint="Waiting for approval" />
      </div>

      <div className="grid min-w-0 gap-4">
        <Card className="min-w-0">
          <div className="grid gap-2 px-5 pt-5 pb-4 sm:grid-cols-[minmax(0,1fr)_190px]">
            <SearchInput value={search} onChange={setSearch} placeholder="Search item, SKU, or category..." />
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              {allCategories.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Categories' : c}
                </option>
              ))}
            </Select>
          </div>
          <DataTable rows={rows} columns={columns} rowKey={(i) => i.id} pageSize={8} />
        </Card>

        <Card className="min-w-0">
          <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">Stock Movement</h3>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Stock in vs stock out, last 6 months</p>
            </div>
          </div>
          <div className="px-5 pb-5">
            <InventoryBarChart data={stockFlow} />
          </div>
        </Card>
      </div>

      <AddItemModal open={addOpen} onClose={() => setAddOpen(false)} nextIndex={items.length + 1} onAdd={addItem} />
      <StockAdjustModal
        item={adjustTarget}
        onClose={() => setAdjustTarget(null)}
        onAdjust={adjust}
      />
    </div>
  )
}
