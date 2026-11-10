# Desain — NEXORA SYSTEMS Admin Dashboard v1

## Ringkasan
Enterprise SaaS dashboard, frontend-only, React 19 + TypeScript + Vite + Tailwind CSS 4.
Halaman beraksen pada: layout shell (sidebar/topbar), Overview padat (stat + grafik + activity + tasks + tabel), 9 halaman sekunder konsisten.

## Arsitektur komponen

```
App.tsx (RouterProvider)
└── DashboardLayout (components/layout/)
    ├── Sidebar          — nomark, grup menu GENERAL/MANAGEMENT/SYSTEM, collapse, mobile drawer
    ├── Topbar           — Breadcrumb, SearchBar, NotificationBell, HelpButton, ThemeToggle,
    │                      UserMenu (dropdown), CompanySelector (dropdown)
    └── <Outlet/>        — pages/*
```

### components/ui/ (primitif reusable)
| Komponen | Isi |
|---|---|
| `Button` | variant: primary / secondary / ghost / outline / danger; size: sm / md; ikon kiri/kanan |
| `Card` + `CardHeader` | surface, border, radius-xl, spacing konsisten |
| `Badge` | soft warn = status (success/warning/danger/info/neutral) |
| `Input` / `Select` / `SearchInput` | label, error text optional, icon |
| `Dropdown` | wrapper popup: klik-luar + Escape menutup, anchor via posisi absolut |
| `Modal` | overlay + Escape + body scroll-lock + ukuran sm/md |
| `Drawer` | slide dari kanan (detail), overlay |
| `Tooltip` | dipakai sidebar collapsed |
| `EmptyState` | icon + title + hint (dipakai tabel/filter kosong) |

### components/
- `charts/`: `AttendanceLineChart`, `InventoryBarChart`, `DepartmentPieChart` — wrapper tipis recharts + `ResponsiveContainer`, warna dari CSS var supaya ikut theme.
- `tables/`: `DataTable<T>` generik — props: `columns`, `rows`, `searchable via keys`, `filters`, `sortable`, `pagination` (client-side). Dipakai Overview, Employees, Attendance, Payroll, Inventory, Procurement, Reports.
- `dashboard/`: `StatCard`, `WelcomeSection`, `RecentActivities`, `PendingTasks`, `AnalyticsGrid`.

## Struktur data (src/types/ + src/data/)
```ts
Company { id, name }
Employee { id, name, department, position, status: 'Active'|'Probation'|'On Leave'|'Resigned', joinDate, email, phone }
AttendanceRow { id, employeeId, name, date, checkIn, checkOut, status: 'Present'|'Late'|'Absent'|'Leave' }
PayrollRecord { id, employeeName, period, basic, allowance, deduction, net, status: 'Paid'|'Pending'|'Processing' }
InventoryItem { id, name, sku, category, stock, minStock, unit, lastUpdate, status (derived: low/ok) }
StockEntry { month, in, out }            // bar-chart
PurchaseRequest { id, requester, department, item, qty, estCost, date, status: 'Pending'|'Approved'|'Rejected'|'Ordered' }
Supplier { id, name, category, contact, rating, onTimeRate }
ActivityItem { id, type: 'employee'|'attendance'|'inventory'|'leave'|'payroll', title, detail, time }
PendingTask { id, kind, title, detail, href }
NotificationItem { id, title, body, time, read, kind }
AttendancePoint { day, present, absent, late }
```
Departament maskapai: `['All','HR','Production','Finance','Warehouse','IT']`.

## State (stores/uiStore — zustand + persist)
```
sidebarCollapsed: boolean            // desktopen ≥1024
mobileDrawerOpen: boolean
theme: 'light' | 'dark'              // persist localStorage, toggle Topbar + Settings
notifications: NotificationItem[]    // read/unread, markAllRead, markRead(id)
companies: Company[]; activeCompanyId
```
Selain itu: state lokal halaman (modal open, form, filter) cukup `useState`.

## Routing (routes/index.tsx)
`/` → redirect `/overview`; route: overview, analytics, employees, attendance, payroll, inventory, procurement, reports (index), notifications, settings. Semua page dibungkus `React.lazy` + `Suspense` fallback skeleton. Breadcrumb dari konfigurasi route meta. Layout dibungkus `RequireLayout` biasa (tanpa auth v1; hanya demo).

## User flow utama
1. Buka `/` → Overview. Pilih perusahaan di Topbar/Welcome; title welcome mengikuti jam.
2. Export CSV → berkas valid dari data mock yang sedang tampil.
3. Navigasi sidebar; collapse → tooltip on hover; <1024px jadi drawer + overlay.
4. Employee row klik → Drawer detail; tombol Add Employee → modal; submit masuk tabel (state lokal page).
5. Inventory Stock In/Out modal → stok ikut berubah + status Low Stock dihitung ulang.
6. Notifikasi klik satu tandai read; topbar badge = unread count; tombol mark-all.
7. Theme toggle persist dan direfresh tetap; grafik/tabel ikut warna dark.
8. Search/filter knob semua tabel benar-benar memfilter; hasil kosong → EmptyState.

## CSV export
`utils/csv.ts`: `toCsv(columns, rows)` escape kutip/koma, `downloadCsv(filename, csv)` via Blob + anchor. Dipakai: Overview, Employees, Payroll, Inventory, Reports.

## Skeleton loading
Page lazy → `PageSkeleton` (kartu + bar). Grafik/Tabel skeleton via `animate-pulse`.
