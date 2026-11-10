# Ceklis — NEXORA SYSTEMS Admin Dashboard v1

> Update status `[x]` setiap respons.

## Fase 0 — Bootstrap
- [x] Cek kondisi workspace (folder `web/`, belum ada project nexora)
- [x] Buat dokumen perencanaan (`ceklis.md`, `desain.md`, `aturan.md`, `palet-warna.md`)
- [x] Scaffold project Vite + React + TS manual di `web/nexora-dashboard/` (package.json, tsconfig, vite config, index.html)
- [x] Install deps: `react`, `react-dom`, `react-router-dom`, `zustand`, `recharts`, `lucide-react`, `@fontsource-variable/inter` + dev: `typescript`, `vite`, `@vitejs/plugin-react`, `tailwindcss`, `@tailwindcss/vite`, `@types/*`
  - Terpasang: react 19.3 / vite 8.3 / tailwind 4.3 / rr 7.18 / **recharts 3.10** (bukan 2.15 — npm resolve latest; API Line/Bar/Pie dasar kompatibel) / TS 7.0 / zustand 5.1 / lucide 1.70
- [x] Verifikasi scaffold: `npm run dev` hidup (HTTP 200, Vite ready 712 ms) + `npx tsc --noEmit` bersih

## Fase 1 — Fondasi
- [x] `src/types/` — tipe Employee, AttendanceRecord, PayrollRecord, InventoryItem, PurchaseRequest, Supplier, ActivityItem, PendingTask, NotificationItem, Company
- [x] `src/data/` — mock data: employees (12), attendance (7 hari + baris), payroll history + salary, inventory (~14 item), procurement (PR + supplier), departments distribution, activities, pending tasks, notifications
- [x] `src/utils/` — `csv.ts` (export CSV valid), `format.ts` (rupiah/ratio, angka), `date.ts` (tanggal saat ini, jadi format ISO)
- [x] `src/stores/` — `uiStore` (zustand): sidebarCollapsed, mobileDrawer, theme (persist localStorage), notifications read state
- [x] Dark mode: Tailwind class strategy (`@custom-variant dark`) + theme toggle persist

## Fase 2 — Komponen UI dasar (`components/ui/`)
- [x] Button (variants: primary/secondary/ghost/danger/outline, sizes sm/md)
- [x] Card, CardHeader, Badge (soft background per status)
- [x] Input, Select, SearchInput (dengan icon)
- [x] Dropdown (user menu, company selector — buka/tutup, klik luar menutup)
- [x] Modal (overlay + escape + body scroll lock)
- [x] Drawer (employee detail + mobile sidebar drawer)
- [x] Tooltip (untuk sidebar collapsed)
- [x] Table primitives: TableWrapper, Th sort header, Pagination

## Fase 3 — Layout
- [x] `DashboardLayout` (grid: sidebar + main; topbar sticky)
- [x] `Sidebar`: logo brand, 3 grup menu, active state, collapsible + tooltip, mobile drawer, tombol collapse
- [x] `Topbar`: breadcrumb (router), search bar, notification button (badge count), help button, theme toggle, user avatar + dropdown, company selector
- [x] Routing: `/` → redirect `/overview`, 10 route + lazy loading (`React.lazy` named-export + `Suspense` PageSkeleton), catch-all `*` → `/overview`
- [x] Konektor: collapse → main content melebar; mobile drawer + overlay; topbar tidak overflow
- [x] Verifikasi visual: light + dark via Playwright CLI screenshot OK; first-visit theme ikut prefers-color-scheme

## Fase 4 — Grafik (`components/charts/`)
- [x] `AttendanceLineChart` (present/absent/late, 7 hari, legend)
- [x] `InventoryBarChart` (stock in/out per bulan)
- [x] `DepartmentPieChart` (donut + HTML legend, total center)
- [x] ResponsiveContainer + theme-aware warna axis/grid, shared `chartTheme.ts`

## Fase 5 — Overview page
- [x] WelcomeSection (greeting dinamis pagi/siang/sore/malam, tanggal, company selector, Export CSV)
- [x] 4 StatCard (icon, nilai, perubahan %, caption periode, trend arrow)
- [x] AnalyticsSection: 3 grafik grid responsive
- [x] RecentActivities (list icon + waktu)
- [x] PendingTasks (list; aksi "review" navigasi ketempat relevan)
- [x] EmployeeOverviewTable: DataTable search + filter department + sort + pagination
- [x] Fix horizontal overflow mobile 390px (`min-w-0` pada grid children; verifikasi scrollWidth 390)

## Fase 6 — Halaman lain (data simulasi, layout konsisten)
- [x] Employees: table + search + filter dept/status + status badge + Add Employee modal (tambah ke state lokal) + detail Drawer (klik row)
- [x] Attendance: 4 stat tiles + table + filter tanggal/dept/status + check-in/check-out mock (clockNow, absent/leave tak bisa clock)
- [x] Payroll: 4 stat tiles + salary table (search/status filter) + payroll history table (initial sort desc)
- [x] Inventory: 4 stat tiles + table + category filter + Add Item modal + Stock In/Out modal (stok berubah real-time, stok ≤ min → Low Stock)
- [x] Procurement: PR table (klik row → detail drawer → Approve/Reject mengubah status) + supplier list (rating star)
- [x] Analytics: 4 stat tiles + line/donut/bar charts + departments summary table
- [x] Reports: 6 kategori kartu + date range filter (validasi from≤to) + Generate CSV per kategori (RFC 4180 + BOM)
- [x] Notifications: list read/unread + klik tandai satu + Mark all as read + badge topbar sinkron
- [x] Settings: company profile (rename tersimpan + muncul di topbar), user profile, appearance (light/dark persist), notification prefs switch persist

## Fase 7 — Polish & Responsivitas
- [x] Breakpoint audit: desktop sidebar fixed (68px/240px), `<lg` mobile drawer, cards 1/2 kolom (sm/xl)
- [x] Tabel mobile: `overflow-x-auto` + `min-w-[640px]`, kontainer page `min-w-0` (scrollWidth 390 == clientWidth di SEMUA 11 route)
- [x] Empty state (DataTable + Attendance & Notifications custom), hover/transition konsisten, PageSkeleton untuk lazy load

## Fase 8 — Verifikasi & deliver
- [x] `npx tsc --noEmit` bersih (strict, noUnusedLocals, verbatimModuleSyntax)
- [ ] `npm run lint` — tidak ada ESLint di project ini (scaffold manual tanpa template), dicatat & dilewati; typecheck + build jadi gerbang kualitas
- [x] `npm run build` sukses — 10 halaman lazy jadi chunk terpisah (~1.2s)
- [x] Smoke test Playwright: 12/12 lolos (collapse sidebar, search navigate, Add Employee, detail drawer, attendance, stock in/out, add item, PR approve, mark-all-read, CSV download, dark persist, rename company)
- [x] Screenshot verifikasi 9 halaman light + 2 dark + root redirect; overflow probe 11 route @390px OK
- [x] README.md (cara jalankan, struktur folder, peta halaman, cara ganti mock data, titik kustomisasi)
- [ ] Git: `git init`, commit awal, push ke GitHub (Aturan Push)
