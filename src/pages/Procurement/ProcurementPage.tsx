import { useMemo, useState } from 'react'
import { Inbox, Truck, CircleCheck, PackageCheck } from 'lucide-react'
import { PageHeader } from '../../components/layout/PageHeader'
import { Card, CardHeader } from '../../components/ui/Card'
import { StatTile } from '../../components/dashboard/StatTile'
import { Badge, statusTone } from '../../components/ui/Badge'
import { SearchInput, Select } from '../../components/ui/Input'
import { Star } from 'lucide-react'
import { DataTable } from '../../components/tables/DataTable'
import type { Column } from '../../components/tables/DataTable'
import { purchaseRequests as seedPrs, suppliers } from '../../data/procurement'
import { formatCurrency, formatDate, formatNumber } from '../../utils/format'
import { PrDetailDrawer } from './PrDetailDrawer'
import type { PurchaseRequest } from '../../types'

export function ProcurementPage() {
  const [requests, setRequests] = useState<PurchaseRequest[]>(seedPrs)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<string>('All')
  const [selected, setSelected] = useState<PurchaseRequest | null>(null)

  const stats = useMemo(
    () => ({
      open: requests.filter((r) => r.status === 'Pending').length,
      approved: requests.filter((r) => r.status === 'Approved').length,
      ordered: requests.filter((r) => r.status === 'Ordered').length,
      suppliers: suppliers.length,
    }),
    [requests],
  )

  const rows = useMemo(
    () =>
      requests.filter(
        (r) =>
          (status === 'All' || r.status === status) &&
          `${r.id} ${r.requester} ${r.itemName} ${r.department}`.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [requests, search, status],
  )

  function decide(id: string, decision: 'Approved' | 'Rejected') {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: decision } : r)))
    setSelected(null)
  }

  const prColumns: Column<PurchaseRequest>[] = [
    { key: 'id', header: 'Request ID', sortable: true, render: (r) => <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{r.id}</span> },
    { key: 'item', header: 'Item', sortable: true, render: (r) => <span className="font-medium text-slate-800 dark:text-slate-100">{r.itemName}</span> },
    { key: 'requester', header: 'Requested By', sortable: true },
    { key: 'department', header: 'Department', sortable: true },
    { key: 'qty', header: 'Qty', align: 'right', sortable: true, render: (r) => <span className="tabular-nums">{r.qty}</span> },
    { key: 'estCost', header: 'Est. Cost', align: 'right', sortable: true, render: (r) => <span className="whitespace-nowrap tabular-nums">{formatCurrency(r.estCost)}</span> },
    { key: 'date', header: 'Date', align: 'right', render: (r) => <span className="whitespace-nowrap">{formatDate(r.date)}</span> },
    {
      key: 'priority',
      header: 'Priority',
      sortable: true,
      sortValue: (r) => (r.priority === 'Urgent' ? 0 : 1),
      render: (r) => (r.priority === 'Urgent' ? <Badge tone="danger">Urgent</Badge> : <Badge tone="neutral">Normal</Badge>),
    },
    { key: 'status', header: 'Status', sortable: true, render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
  ]

  const supplierColumns: Column<(typeof suppliers)[number]>[] = [
    { key: 'name', header: 'Supplier', sortable: true, render: (s) => <span className="font-medium text-slate-800 dark:text-slate-100">{s.name}</span> },
    { key: 'category', header: 'Category', sortable: true },
    { key: 'email', header: 'Contact', render: (s) => <span className="truncate text-xs">{s.email}</span> },
    {
      key: 'rating',
      header: 'Rating',
      align: 'right',
      sortable: true,
      render: (s) => (
        <span className="inline-flex items-center gap-1 whitespace-nowrap tabular-nums">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
          {s.rating.toFixed(1)}
        </span>
      ),
    },
    { key: 'onTimeRate', header: 'On-time', align: 'right', sortable: true, render: (s) => <span className="whitespace-nowrap tabular-nums">{s.onTimeRate}%</span> },
    { key: 'partnerSince', header: 'Partner Since', align: 'right', sortable: true },
  ]

  return (
    <div className="min-w-0">
      <PageHeader title="Procurement" description="Purchase requests, approvals, and supplier performance." />

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile icon={Inbox} tone="amber" label="Awaiting Approval" value={formatNumber(stats.open)} hint="Urgent items first" />
        <StatTile icon={CircleCheck} tone="green" label="Approved" value={formatNumber(stats.approved)} hint="Ready for ordering" />
        <StatTile icon={PackageCheck} tone="blue" label="Ordered" value={formatNumber(stats.ordered)} hint="In delivery" />
        <StatTile icon={Truck} tone="slate" label="Active Suppliers" value={formatNumber(stats.suppliers)} hint="Avg. on-time 92%" />
      </div>

      <div className="grid min-w-0 gap-4">
        <Card className="min-w-0">
          <CardHeader title="Purchase Requests" subtitle="Click a row to review and decide" />
          <div className="grid gap-2 px-5 pb-4 sm:grid-cols-[minmax(0,1fr)_170px]">
            <SearchInput value={search} onChange={setSearch} placeholder="Search item, requester, or request ID..." />
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Ordered">Ordered</option>
            </Select>
          </div>
          <DataTable rows={rows} columns={prColumns} rowKey={(r) => r.id} pageSize={8} onRowClick={setSelected} />
        </Card>

        <Card className="min-w-0">
          <CardHeader title="Supplier List" subtitle="Active partnerships and delivery performance" />
          <DataTable rows={suppliers} columns={supplierColumns} rowKey={(s) => s.id} pageSize={6} />
        </Card>
      </div>

      <PrDetailDrawer request={selected} onClose={() => setSelected(null)} onDecide={decide} />
    </div>
  )
}
