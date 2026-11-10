# Palet Warna & Tipografi — NEXORA SYSTEMS

## Light mode (default)
| Token | Hex | Tailwind | Kegunaan |
|---|---|---|---|
| primary | #2563EB | blue-600 | tombol utama, link, aktif menu, accent |
| primary-soft | #EFF6FF | blue-50 | background aktif sidebar / badge info |
| bg | #F8FAFC | slate-50 | background app |
| surface | #FFFFFF | white | kartu, sidebar, topbar |
| text-primary | #0F172A | slate-900 | judul, angka besar |
| text-secondary | #64748B | slate-500 | label, keterangan |
| border | #E2E8F0 | slate-200 | border kartu, divider, input |
| hover-bg | #F1F5F9 | slate-100 | hover item menu/tabel |
| success | #16A34A | green-600 | badge positif, trend naik + |
| warning | #D97706 | amber-600 | badge warning, pending |
| danger | #DC2626 | red-600 | badge merah, trend turun, delete |

Soft background versi badge: green-50 / amber-50 / red-50 dengan teks green-700 / amber-700 / red-700.

## Dark mode
| Token | Nilai | Kegunaan |
|---|---|---|
| bg | slate-950 #020617 | background app |
| surface | slate-900 #0F172A | kartu, sidebar, topbar |
| border | slate-800 #1E293B | border/divider/input |
| hover | slate-800/60 atau slate-100/5 | hover row/menu |
| text-primary | slate-50 | judul |
| text-secondary | slate-400 | keterangan |
| primary | blue-500 #3B82F6 | lebih terang di dark |
| backdrop | slate-950/60 | overlay modal/drawer (blur ringan) |

Aturan: chart → garis/grid pakai CSS var `--border` & `--text-secondary`; warna line/bar/pie konstanta brand (blue-600, emerald-500, amber-500, violet-500, cyan-500).

## Tipografi
- Font: **Inter Variable** (bundled via `@fontsource-variable/inter`, lokal bukan CDN).
- Skala: 
  - Page title `text-2xl/28px` semibold slate-900 (dark: slate-50)
  - Section title `text-base` semibold
  - Label/keterangan `text-xs`/`sm` slate-500 medium
  - KPI number `text-2xl/3xl` semibold tracking-tight, font-variant tabular-nums
- Body default `text-sm` (dashboard menyaratkan rapat tapi sembunyikan clutter). leading 1.5.

## Spacing & shape
- Radius: kartu `rounded-xl`, input/button `rounded-lg`, badge `rounded-md`, avatar penuh.
- Shadow: `shadow-[0_1px_2px_rgba(15,23,42,0.06)]` (tipis; dark: tanpa shadow, pakai border).
- Gap konsisten 4 (16px) elemen, section padding 24px, page padding 24/32px.
- Fokus ring: `ring-2 ring-blue-600/40`.
- Chart warna urutan (department & line): `blue-600`, `emerald-500`, `amber-500`, `violet-500`, `cyan-500`.
