# Aturan — NEXORA SYSTEMS Admin Dashboard v1

## Batasan khusus
1. **Frontend only.** Tanpa backend, tanpa database, tanpa fetch ke server. Semua data dari `src/data/*.ts` mock, state mutasi pada memori/localStorage.
2. **Setiap tombol/elemen interaktif harus punya aksi nyata.** Ada tombol dekorasi = bug.
3. **Dependency fixed** (stabil + kompatibel): react 19, react-dom 19, react-router-dom 7, zustand 5, recharts 2.15 (bukan v3 — API klasik lebih aman), lucide-react (latest), tailwindcss 4, vite 7, typescript 5.6+, @types/react(-dom) 19, @fontsource-variable/inter.
4. Tidak menambah paket lain tanpa alasan kuat (mis. tidak perlu daisyUI — komponen dibuat sendiri).
5. TypeScript strict: `noAny`. Kalau memang perlu, kasih tipe struktur dulu.
6. Ikon **hanya lucide-react** dengan import bernama (biarkan tree-sh TreeNode pakai import default).
7. Dark mode via class strategy Tailwind 4: `@custom-variant dark (&:where(.dark, .dark *));` di CSS. `<html class="dark">` diset saat boot dari store.
8. **Tidak mengubah file/kerjaan proyek lain** di workspace (website-bisnis, bot, dst). Project cakupannya hanya `web/nexora-dashboard/`.
9. Git: setelah verifikasi lulus, `git init` + commit per sesi, push ke GitHub (Aturan Push MansxDev).
10. Bahasa komentar/UI: UI English (style enterprise), komentar/commit English ringkas.

## Pola wajib (hasil debug 2026-11-10)
- **Grid layout**: setiap child langsung dari grid (apalagi yang berisi tabel/chart/teks panjang) wajib tambah `min-w-0` — tanpa itu track grid membesar mengikuti min-content (tabel `min-w-[640px]`) dan bikin horizontal overflow di mobile. Sudah diverifikasi scr full: `scrollWidth == viewportWidth`.
- Tidak ada dev deps di luar daftar; skrip Playwright diagnostik dilarang masuk git.

## Asumsi
- Tidak ada auth v1 — langsung masuk dashboard. Profil admin adalah mock ("Administrator — Super Admin").
- "Company selector" mengganti label/laporan; tidak mempengaruhi isi data mock selain label halaman.
- Angka/KPI sesuai contoh di prompt (248, 216, 1.284, 18). Data lain boleh dibuat realistis bebas.

## Edge case yang harus ditangani
| Kasus | Perlakuan |
|---|---|
| Hasil search/filter kosong | `EmptyState` (“No results for “xyz””), bukan layout rusak |
| Nama/teks panjang | truncate + `title` attribute; tabel minimum `min-w` + `overflow-x-auto` |
| Escape modal/drawer/dropdown | semua menutup, body scroll lock saat open |
| Klik luar dropdown | menutup; klik di dalam tidak |
| Sidebar collapsed | label ikut hilang; tooltip muncul di item menu & tombol collapse |
| Resize sembarangan (sidebar tertutup lalu ke desktop) | `sidebarCollapsed` tidak memicu drawer; ambang dari CSS (lg:) |
| Restart browser | theme & notif read persist; unread badge tetap |
| CSV: angka/koma | escape dan format aman; nama file constexpr per dasar page |
| Recharts resize | `ResponsiveContainer` + wrapper `min-h` agar tidak collapse di height 0 |
| Route tak dikenal | fallback redirect /overview (catch-all `*`) |

## Dilarang
- `any`, `console.log` tertinggal, komponen file >300 baris tanpa extraksi, duplikasi style antar tabel (wajib pakai `DataTable`).
- Gradient berat, glassmorphism, warna di luar palet kecuali warna state semantik (success/warning/danger).
- Mengubah `tsconfig`/`vite.config` sembarangan yang sudah stabil.

## Done definition (per fase)
Build development lulus + smoke manual: navigasi walk, modal/drawer open-close, dark mode toggle persist, CSV diunduh, responsive 1280 / 834 / 390 px.
