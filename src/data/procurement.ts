import type { PurchaseRequest, Supplier } from '../types'

export const purchaseRequests: PurchaseRequest[] = [
  { id: 'PR-1042', requester: 'Rizky Ramadhan', department: 'IT', itemName: 'Networking Switch 24-port', qty: 2, estCost: 1140, date: '2026-11-08', status: 'Pending', priority: 'Urgent' },
  { id: 'PR-1041', requester: 'Siti Halimah', department: 'Production', itemName: 'Hydraulic Press Seal Kit', qty: 6, estCost: 1800, date: '2026-11-07', status: 'Pending', priority: 'Urgent' },
  { id: 'PR-1040', requester: 'Bunga Maharani', department: 'HR', itemName: 'Workshop Training Kit', qty: 1, estCost: 460, date: '2026-11-06', status: 'Approved', priority: 'Normal' },
  { id: 'PR-1039', requester: 'Fajar Nugroho', department: 'Warehouse', itemName: 'Pallet Racking Beam', qty: 20, estCost: 2400, date: '2026-11-05', status: 'Ordered', priority: 'Normal' },
  { id: 'PR-1038', requester: 'Dewi Anggraini', department: 'Finance', itemName: 'Document Shredder', qty: 1, estCost: 310, date: '2026-11-04', status: 'Approved', priority: 'Normal' },
  { id: 'PR-1037', requester: 'Kevin Tanaka', department: 'Production', itemName: 'Welding Electrodes (10kg)', qty: 8, estCost: 520, date: '2026-11-03', status: 'Pending', priority: 'Normal' },
  { id: 'PR-1036', requester: 'Bayu Setiawan', department: 'Warehouse', itemName: 'Barcode Scanner (Wireless)', qty: 3, estCost: 870, date: '2026-11-02', status: 'Rejected', priority: 'Normal' },
  { id: 'PR-1035', requester: 'Nadia Kirana', department: 'IT', itemName: 'Monitor 27" IPS', qty: 4, estCost: 1240, date: '2026-11-01', status: 'Ordered', priority: 'Normal' },
]

export const suppliers: Supplier[] = [
  { id: 'SUP-01', name: 'Mekanika Industri Jaya', category: 'Raw Materials', email: 'sales@mekanika.co.id', phone: '+62 21-5551-0200', rating: 4.8, onTimeRate: 96, partnerSince: '2019' },
  { id: 'SUP-02', name: 'Pro-Safety Supplies', category: 'Safety', email: 'order@prosafety.com', phone: '+62 21-5551-0314', rating: 4.6, onTimeRate: 93, partnerSince: '2020' },
  { id: 'SUP-03', name: 'Kantor Jaya Office', category: 'Office Supplies', email: 'cs@kantorjaya.id', phone: '+62 21-5551-0421', rating: 4.3, onTimeRate: 89, partnerSince: '2021' },
  { id: 'SUP-04', name: 'Tekno Global Equipment', category: 'Equipment', email: 'b2b@teknoglobal.com', phone: '+62 21-5551-0533', rating: 4.7, onTimeRate: 95, partnerSince: '2018' },
  { id: 'SUP-05', name: 'Packing Prima', category: 'Packaging', email: 'info@packingprima.co.id', phone: '+62 21-5551-0648', rating: 4.1, onTimeRate: 87, partnerSince: '2022' },
]
