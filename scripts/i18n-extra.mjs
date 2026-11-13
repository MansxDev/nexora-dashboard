// Tambah/ubah terjemahan ke en (identitas) & id.
import { readFileSync, writeFileSync } from 'node:fs'

const EN = 'src/locales/en/translation.json'
const ID = 'src/locales/id/translation.json'

const pairs = {
  // waktu relatif
  '12 min ago': '12 menit lalu',
  '25 min ago': '25 menit lalu',
  '34 min ago': '34 menit lalu',
  '1 h ago': '1 jam lalu',
  '2 h ago': '2 jam lalu',
  '3 h ago': '3 jam lalu',
  '4 h ago': '4 jam lalu',
  '5 h ago': '5 jam lalu',
  '8 h ago': '8 jam lalu',
  '2 days ago': '2 hari lalu',

  // aktivitas & tugas
  '216 check-ins captured for today': '216 check-in tercatat hari ini',
  'Packaging Tape 48mm stock adjusted −120 rolls': 'Stok Packaging Tape 48mm disesuaikan −120 roll',
  'Annual leave + sick leave requests from 5 employees': 'Permintaan cuti tahunan + cuti sakit dari 5 karyawan',

  // notifikasi
  'Draft payroll for 248 employees has been recalculated.': 'Draf payroll untuk 248 karyawan telah dihitung ulang.',
  'Low stock: Latex Gloves': 'Stok menipis: Latex Gloves',
  'Stock 58 / min 60 — consider restocking this week.': 'Stok 58 / min 60 — pertimbangkan restock minggu ini.',
  'Rizky Ramadhan requested a 24-port networking switch (urgent).': 'Rizky Ramadhan mengajukan switch jaringan 24 port (mendesak).',
  'Today: 216 present · 20 late · 12 absent.': 'Hari ini: 216 hadir · 20 terlambat · 12 tidak hadir.',
  'Daily automated backup finished at 02:00.': 'Backup otomatis harian selesai pukul 02.00.',
  'Transfer INV-013 → Warehouse B has been approved.': 'Transfer INV-013 → Gudang B telah disetujui.',
  'NEXORA Center update improves report exports.': 'Pembaruan NEXORA Center memperbaiki ekspor laporan.',
  PAYROLL: 'PAYROLL',
  INVENTORY: 'INVENTARIS',
  PROCUREMENT: 'PENGADAAN',
  ATTENDANCE: 'KEHADIRAN',
  SYSTEM: 'SISTEM',

  // tab & filter
  All: 'Semua',
  Unread: 'Belum Dibaca',
  'All Categories': 'Semua Kategori',
  Current: 'Saat ini',
  Edited: 'Diubah',

  // nilai statistik analytics (format angka Indonesia)
  '$482,000': 'US$482.000',
  '91.2%': '91,2%',
  '4.6×': '4,6×',
  '3.2 days': '3,2 hari',
  'Total {{count}} employees': 'Total {{count}} karyawan',

  // preset tanggal kehadiran
  'Today — Nov 10, 2026': 'Hari Ini — 10 Nov 2026',
  'Yesterday — Nov 09, 2026': 'Kemarin — 09 Nov 2026',
  'Last Friday — Nov 07, 2026': 'Jumat Lalu — 07 Nov 2026',

  // catatan kaki kehadiran
  "Attendance summary published daily at 17:00 · today's snapshot: {{present}} present · {{late}} late · {{absent}} absent.":
    'Ringkasan kehadiran diterbitkan setiap hari pukul 17.00 · cuplikan hari ini: {{present}} hadir · {{late}} terlambat · {{absent}} tidak hadir.',
}

const en = JSON.parse(readFileSync(EN, 'utf8'))
const id = JSON.parse(readFileSync(ID, 'utf8'))

for (const [k, v] of Object.entries(pairs)) {
  en[k] = k
  id[k] = v
}

// urutkan biar diff stabil
const sorted = (o) => Object.fromEntries(Object.keys(o).sort().map((k) => [k, o[k]]))
const enSorted = sorted(en)
const idSorted = sorted(id)

writeFileSync(EN, JSON.stringify(enSorted, null, 2) + '\n')
writeFileSync(ID, JSON.stringify(idSorted, null, 2) + '\n')
console.log('en:', Object.keys(enSorted).length, '| id:', Object.keys(idSorted).length)
