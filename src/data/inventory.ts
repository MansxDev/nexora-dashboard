import type { InventoryItem, StockFlowPoint } from '../types'

export const inventoryCategories = [
  'Raw Materials',
  'Safety',
  'Office Supplies',
  'Equipment',
  'Packaging',
] as const

export const inventoryItems: InventoryItem[] = [
  { id: 'INV-001', sku: 'RM-A021', name: 'Steel Bar 12mm (10pcs/pack)', category: 'Raw Materials', stock: 240, minStock: 80, unit: 'pack', lastUpdate: '2026-11-09' },
  { id: 'INV-002', sku: 'RM-A034', name: 'Engine Oil 5W-30 (20L drum)', category: 'Raw Materials', stock: 46, minStock: 50, unit: 'drum', lastUpdate: '2026-11-08' },
  { id: 'INV-003', sku: 'RM-A102', name: 'Hydraulic Press Seal Kit', category: 'Raw Materials', stock: 12, minStock: 15, unit: 'box', lastUpdate: '2026-11-07' },
  { id: 'INV-004', sku: 'SF-B011', name: 'Safety Helmet (ANSI)', category: 'Safety', stock: 132, minStock: 40, unit: 'pcs', lastUpdate: '2026-11-10' },
  { id: 'INV-005', sku: 'SF-B022', name: 'Latex Gloves (Box 100)', category: 'Safety', stock: 58, minStock: 60, unit: 'box', lastUpdate: '2026-11-09' },
  { id: 'INV-006', sku: 'SF-B034', name: 'Fire Extinguisher 6kg', category: 'Safety', stock: 24, minStock: 10, unit: 'unit', lastUpdate: '2026-11-05' },
  { id: 'INV-007', sku: 'OS-C042', name: 'A4 Paper Ream 80gsm', category: 'Office Supplies', stock: 310, minStock: 100, unit: 'ream', lastUpdate: '2026-11-10' },
  { id: 'INV-008', sku: 'OS-C055', name: 'Toner Cartridge TN-245', category: 'Office Supplies', stock: 9, minStock: 12, unit: 'pcs', lastUpdate: '2026-11-06' },
  { id: 'INV-009', sku: 'OS-C061', name: 'Invoice Book A5 (2-ply)', category: 'Office Supplies', stock: 74, minStock: 30, unit: 'pcs', lastUpdate: '2026-11-04' },
  { id: 'INV-010', sku: 'EQ-D013', name: 'LED Panel Light 36W', category: 'Equipment', stock: 45, minStock: 25, unit: 'pcs', lastUpdate: '2026-10-28' },
  { id: 'INV-011', sku: 'EQ-D027', name: 'Forklift Battery 48V', category: 'Equipment', stock: 3, minStock: 4, unit: 'unit', lastUpdate: '2026-11-02' },
  { id: 'INV-012', sku: 'EQ-D041', name: 'Ethernet Cable Cat6 5m', category: 'Equipment', stock: 96, minStock: 30, unit: 'pcs', lastUpdate: '2026-11-01' },
  { id: 'INV-013', sku: 'PK-E081', name: 'Cardboard Box — Large', category: 'Packaging', stock: 520, minStock: 200, unit: 'pcs', lastUpdate: '2026-11-10' },
  { id: 'INV-014', sku: 'PK-E093', name: 'Packaging Tape 48mm', category: 'Packaging', stock: 18, minStock: 36, unit: 'roll', lastUpdate: '2026-11-08' },
]

/** Monthly stock-in/stock-out totals, used by the bar chart. */
export const stockFlow: StockFlowPoint[] = [
  { month: 'Jun', stockIn: 1150, stockOut: 1042 },
  { month: 'Jul', stockIn: 1380, stockOut: 1225 },
  { month: 'Aug', stockIn: 1020, stockOut: 990 },
  { month: 'Sep', stockIn: 1210, stockOut: 1305 },
  { month: 'Oct', stockIn: 1310, stockOut: 1180 },
  { month: 'Nov', stockIn: 640, stockOut: 575 },
]
