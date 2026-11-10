import { useState } from 'react'
import type { FormEvent } from 'react'
import { Modal } from '../../components/ui/Modal'
import { Button } from '../../components/ui/Button'
import { Input, Select } from '../../components/ui/Input'
import { inventoryCategories } from '../../data/inventory'
import type { InventoryItem } from '../../types'
import { formatNumber } from '../../utils/format'
import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-react'

interface AddItemModalProps {
  open: boolean
  onClose: () => void
  nextIndex: number
  onAdd: (item: Omit<InventoryItem, 'id' | 'lastUpdate'>) => void
}

export function AddItemModal({ open, onClose, nextIndex, onAdd }: AddItemModalProps) {
  const [name, setName] = useState('')
  const [sku, setSku] = useState('')
  const [category, setCategory] = useState<string>(inventoryCategories[0])
  const [stock, setStock] = useState('10')
  const [minStock, setMinStock] = useState('5')
  const [unit, setUnit] = useState('pcs')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !sku.trim()) return
    onAdd({
      name: name.trim(),
      sku: sku.trim().toUpperCase(),
      category,
      stock: Math.max(0, Number(stock) || 0),
      minStock: Math.max(0, Number(minStock) || 0),
      unit: unit.trim() || 'pcs',
    })
    setName('')
    setSku('')
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add item"
      description={`Next SKU ID: INV-${String(nextIndex).padStart(3, '0')}`}
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" type="submit" form="add-item-form">
            Add item
          </Button>
        </>
      }
    >
      <form id="add-item-form" onSubmit={handleSubmit} className="grid grid-cols-1 gap-3.5 pt-1 sm:grid-cols-2">
        <Input label="Item name" required placeholder="e.g. Steel Bolt M8 (100pcs)" value={name} onChange={(e) => setName(e.target.value)} className="sm:col-span-2" />
        <Input label="SKU" required placeholder="e.g. RM-A110" value={sku} onChange={(e) => setSku(e.target.value)} />
        <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {inventoryCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
        <Input label="Current stock" type="number" min={0} value={stock} onChange={(e) => setStock(e.target.value)} />
        <Input label="Minimum stock" type="number" min={0} value={minStock} onChange={(e) => setMinStock(e.target.value)} />
        <Input label="Unit" placeholder="pcs, pack, drum ..." value={unit} onChange={(e) => setUnit(e.target.value)} className="sm:col-span-2" />
      </form>
    </Modal>
  )
}

interface StockAdjustModalProps {
  item: InventoryItem | null
  onClose: () => void
  onAdjust: (id: string, kind: 'in' | 'out', qty: number) => void
}

export function StockAdjustModal({ item, onClose, onAdjust }: StockAdjustModalProps) {
  const [kind, setKind] = useState<'in' | 'out'>('in')
  const [qty, setQty] = useState('1')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!item) return
    const q = Math.max(1, Number(qty) || 1)
    onAdjust(item.id, kind, q)
    onClose()
  }

  return (
    <Modal
      open={Boolean(item)}
      onClose={onClose}
      title="Stock movement"
      description={item ? `${item.name} — current stock ${formatNumber(item.stock)} ${item.unit}` : undefined}
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" type="submit" form="stock-adjust-form">
            Apply movement
          </Button>
        </>
      }
    >
      <form id="stock-adjust-form" onSubmit={handleSubmit} className="grid grid-cols-1 gap-3.5 pt-1">
        <div className="grid grid-cols-2 gap-2.5" role="radiogroup" aria-label="Movement direction">
          {(
            [
              { value: 'in', label: 'Stock In', icon: ArrowDownToLine },
              { value: 'out', label: 'Stock Out', icon: ArrowUpFromLine },
            ] as const
          ).map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={kind === value}
              onClick={() => setKind(value)}
              className={
                'flex items-center gap-2 rounded-lg border px-3.5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40' +
                (kind === value
                  ? ' border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                  : ' border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800')
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
        <Input label="Quantity" type="number" min={1} value={qty} onChange={(e) => setQty(e.target.value)} />
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Movement is logged locally in this demo — no backend call is made.
        </p>
      </form>
    </Modal>
  )
}
