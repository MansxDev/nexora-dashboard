/** Kumpulkan semua key i18n dari source + data, lalu tulis en.json & id.json */
import { readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'

const files = execSync("find src -name '*.tsx' -o -name '*.ts'", { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter(Boolean)

const keys = new Set()

// 1. Literal t('...')
for (const f of files) {
  const src = readFileSync(f, 'utf8')
  for (const m of src.matchAll(/\bt\(\s*'((?:[^'\\]|\\.)*)'/g)) keys.add(m[1].replace(/\\'/g, "'"))
}

// 2. Nilai string di data & kolom (diterjemahkan saat render lewat t(prop))
const FIELDS = ['label', 'period', 'header', 'hint', 'title', 'detail', 'time', 'name', 'category', 'department', 'position']
for (const f of files) {
  const src = readFileSync(f, 'utf8')
  for (const field of FIELDS) {
    const re = new RegExp(`\\b${field}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 'g')
    for (const m of src.matchAll(re)) {
      const v = m[1].replace(/\\'/g, "'")
      if (/^[A-Za-z][A-Za-z0-9 ,.'&/·%()-]*$/.test(v) && v.length > 2) keys.add(v)
    }
  }
}

// 3. Status & nilai enum yang tampil via Badge
const ENUM_VALUES = ['Active', 'Inactive', 'Probation', 'Resigned', 'On Leave', 'Present', 'Late', 'Absent', 'Leave', 'Paid', 'Pending', 'Processing', 'Approved', 'Rejected', 'Ordered', 'Urgent', 'Normal', 'Low Stock', 'Healthy']
for (const v of ENUM_VALUES) keys.add(v)

writeFileSync('/tmp/keys-final.json', JSON.stringify([...keys].sort(), null, 2))
console.log(keys.size, 'keys')
console.log([...keys].sort().join('\n'))
