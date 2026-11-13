// Terjemahan nama barang/jasa + satuan (data contoh) ke Bahasa Indonesia.
import { readFileSync, writeFileSync } from 'node:fs'

const EN = 'src/locales/en/translation.json'
const ID = 'src/locales/id/translation.json'

const pairs = {
  // nama barang inventaris
  'Steel Bar 12mm (10pcs/pack)': 'Batang Baja 12mm (10pcs/pak)',
  'Engine Oil 5W-30 (20L drum)': 'Oli Mesin 5W-30 (drum 20L)',
  'Hydraulic Press Seal Kit': 'Seal Kit Mesin Press Hidrolik',
  'Safety Helmet (ANSI)': 'Helm Keselamatan (ANSI)',
  'Latex Gloves (Box 100)': 'Sarung Tangan Latex (Kotak 100)',
  'Fire Extinguisher 6kg': 'APAR 6kg',
  'A4 Paper Ream 80gsm': 'Kertas A4 Rim 80gsm',
  'Toner Cartridge TN-245': 'Katrid Toner TN-245',
  'Invoice Book A5 (2-ply)': 'Buku Invoice A5 (2 ply)',
  'LED Panel Light 36W': 'Lampu Panel LED 36W',
  'Forklift Battery 48V': 'Baterai Forklift 48V',
  'Ethernet Cable Cat6 5m': 'Kabel Ethernet Cat6 5m',
  'Cardboard Box — Large': 'Kardus — Besar',
  'Packaging Tape 48mm': 'Lakban Kemasan 48mm',

  // nama barang pengadaan
  'Networking Switch 24-port': 'Switch Jaringan 24 port',
  'Workshop Training Kit': 'Kit Pelatihan Workshop',
  'Pallet Racking Beam': 'Balok Rak Palet',
  'Document Shredder': 'Mesin Penghancur Dokumen',
  'Welding Electrodes (10kg)': 'Elektroda Las (10kg)',
  'Barcode Scanner (Wireless)': 'Pemindai Barcode (Nirkabel)',

  // satuan
  pack: 'pak',
  box: 'kotak',
  ream: 'rim',
  roll: 'roll',
  drum: 'drum',
  pcs: 'pcs',
  unit: 'unit',
  roll_: 'roll',
}

delete pairs.roll_

const en = JSON.parse(readFileSync(EN, 'utf8'))
const id = JSON.parse(readFileSync(ID, 'utf8'))
for (const [k, v] of Object.entries(pairs)) {
  en[k] = k
  id[k] = v
}
const sort = (o) => Object.fromEntries(Object.keys(o).sort().map((k) => [k, o[k]]))
writeFileSync(EN, JSON.stringify(sort(en), null, 2) + '\n')
writeFileSync(ID, JSON.stringify(sort(id), null, 2) + '\n')
console.log('en', Object.keys(en).length, 'id', Object.keys(id).length)
