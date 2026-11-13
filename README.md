# NEXORA SYSTEMS — Admin Dashboard

Frontend-only enterprise SaaS admin dashboard demo. 10 fully interactive pages, dark mode, responsive down to 390px — zero backend, all state is local mock data.

> **This is a demo.** Every entity (employees, payroll, inventory, procurement, …) is mock data. No API calls, no persistence beyond `localStorage` UI preferences.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # typecheck (tsc --noEmit) + production build to dist/
npm run preview    # serve the production build
npm run typecheck  # tsc --noEmit only
```

## Pages

| Route | Page | Highlights |
|---|---|---|
| `/` | → redirect | Lands on `/overview` |
| `/overview` | Overview | Greeting + date, 4 stat cards, 3 charts, activities, pending tasks (navigate), employee table |
| `/analytics` | Analytics | Business stat tiles, attendance/inventory/department analytics |
| `/employees` | Employees | Search + department/status filters, sorting, pagination, Add Employee modal, detail drawer (click a row) |
| `/attendance` | Attendance | Daily records, date/status filters, mock check-in/check-out |
| `/payroll` | Payroll | Salary table + 6-month payroll history, CSV export |
| `/inventory` | Inventory | Stock levels with low-stock badges, Add Item modal, Stock In/Out adjustments |
| `/procurement` | Procurement | Purchase requests (approve/reject via detail drawer), supplier ratings |
| `/reports` | Reports | 6 report categories, date range, real CSV generation |
| `/notifications` | Notifications | Read/unread, mark one or all as read, topbar badge syncs |
| `/settings` | Settings | Company rename (reflects in topbar), profile, appearance, notification prefs |

## Everything is actually interactive

No decorative buttons. Add employee/item inserts a row; stock in/out changes the numbers; approve/reject updates the PR status; mark-all-read clears the topbar badge; Generate CSV downloads a real file; theme, sidebar state, notification read-state and company rename persist in `localStorage` (`nexora-ui` key).

## Project structure

```
src/
├── components/
│   ├── ui/            # Button, Card, Badge, Input, Modal, Drawer, Dropdown, Tooltip, EmptyState
│   ├── tables/        # DataTable<T> (generic, sort + pagination), Pagination
│   ├── charts/        # AttendanceLineChart, InventoryBarChart, DepartmentPieChart + chartTheme
│   ├── layout/        # Sidebar, Topbar, Breadcrumb, GlobalSearch, NotificationBell, PageHeader, nav.ts
│   └── dashboard/     # StatCard, StatTile, WelcomeSection, RecentActivities, PendingTasks…
├── data/              # ← ALL mock data lives here
├── layouts/           # DashboardLayout (sidebar + topbar + outlet)
├── pages/             # 10 pages, one folder each (incl. per-page modals/drawers)
├── routes/            # route table, lazy per page with PageSkeleton fallback
├── stores/            # zustand uiStore (theme, sidebar, notifications, prefs, companies)
├── types/             # all shared TypeScript types
└── utils/             # csv (RFC 4180 + BOM), format (Intl, locale-aware), theme, cn
```

## Internationalization (EN ⇄ ID)

The whole UI ships in English and Indonesian. Use the globe button in the topbar to toggle; the choice is stored in `localStorage` (`nexora.locale`) and survives reloads.

- `src/i18n/config.ts` — i18next init. Translations are **bundled** (`import` from `src/locales/*`), not fetched, so there is no flash of raw keys on first paint.
- `src/locales/en/translation.json` — English (key = original English text, so `en` is effectively the identity map).
- `src/locales/id/translation.json` — Indonesian. Keys missing here simply fall back to the English key.
- **Key strategy:** the key is the English string itself, e.g. `t('Total Employees')`. Data-driven strings (`header`, `label`, `hint`, `period`, `title`, `detail`, `name`, `position`, `status`) are translated at render time with `t(prop)`, so `src/data/` stays in one language.
- Numbers, currency and dates follow the active locale (`en-US` / `id-ID`) via `src/utils/format.ts`.
- Maintenance scripts in `scripts/`: `i18n-keys.mjs` (collect keys), `i18n-messages.mjs` (regenerate `en.json`), `i18n-extra.mjs` / `i18n-items.mjs` (add translations).

## Customization points

**Replace mock data** — edit the files in `src/data/`; types in `src/types/index.ts` are the contract. Tables/charts pick changes up automatically.

**Currency & locale** — `src/utils/format.ts`:

```ts
function locale(): string {
  return i18n.resolvedLanguage?.startsWith('id') ? 'id-ID' : 'en-US'
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat(locale(), { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}
```

Swap `currency: 'USD'` → `'IDR'` to go full rupiah; the number/date formatting already follows the active language.

**Theme palette** — charts read from `src/components/charts/chartTheme.ts`; component colors are plain Tailwind classes (slate/blue-600 base).

**Branding** — the sidebar brand block (`components/layout/Sidebar.tsx`), `<title>` in `index.html`, and `public/favicon.svg`.

## Conventions

- React 19 + TypeScript (strict), Vite 8, Tailwind CSS 4 (CSS-first config, `@custom-variant dark`)
- react-router 7 — each page lazy-loads via named exports (`.then((m) => ({ default: m.X }})`)
- No `any`; `noUnusedLocals` / `noUnusedParameters` on
- **Layout gotcha:** every direct child of a grid that holds a table/chart must carry `min-w-0`, or the track expands to the table's `min-w-[640px]` and breaks 390px layout (learned the hard way; verified via a scrollWidth probe on all routes)
- lucide-react v1 canonical names only — `CircleCheck`, not the removed `CheckCircle2` alias
