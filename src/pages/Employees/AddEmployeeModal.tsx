import { useState } from 'react'
import type { Department, EmployeeStatus } from '../../types'
import { Modal } from '../../components/ui/Modal'
import { Button } from '../../components/ui/Button'
import { Input, Select } from '../../components/ui/Input'
import { departments } from '../../data/employees'
import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'

interface AddEmployeeModalProps {
  open: boolean
  onClose: () => void
  onAdd: (draft: { name: string; email: string; department: Department; position: string; status: EmployeeStatus }) => void
}

export function AddEmployeeModal({ open, onClose, onAdd }: AddEmployeeModalProps) {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [position, setPosition] = useState('')
  const [department, setDepartment] = useState<Department>('Production')
  const [status, setStatus] = useState<EmployeeStatus>('Probation')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    onAdd({ name: name.trim(), email: email.trim(), position: position.trim() || 'Staff', department, status })
    setName('')
    setEmail('')
    setPosition('')
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('Add employee')}
      description={t('New team member — goes through probation by default.')}
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>
            {t('Cancel')}
          </Button>
          <Button size="sm" type="submit" form="add-employee-form">
            {t('Add employee')}
          </Button>
        </>
      }
    >
      <form id="add-employee-form" onSubmit={handleSubmit} className="grid grid-cols-1 gap-3.5 pt-1 sm:grid-cols-2">
        <Input label={t('Full name')} required placeholder={t('e.g. Rinda Lestari')} value={name} onChange={(e) => setName(e.target.value)} className="sm:col-span-2" />
        <Input label={t('Work email')} required type="email" placeholder="name@nexora.io" value={email} onChange={(e) => setEmail(e.target.value)} className="sm:col-span-2" />
        <Select label={t('Department')} value={department} onChange={(e) => setDepartment(e.target.value as Department)}>
          {departments.map((d) => (
            <option key={d} value={d}>
              {t(d)}
            </option>
          ))}
        </Select>
        <Select label={t('Employment status')} value={status} onChange={(e) => setStatus(e.target.value as EmployeeStatus)}>
          <option value="Probation">{t('Probation')}</option>
          <option value="Active">{t('Active')}</option>
          <option value="On Leave">{t('On Leave')}</option>
          <option value="Resigned">{t('Resigned')}</option>
        </Select>
        <Input label={t('Position')} placeholder={t('e.g. Warehouse Staff')} value={position} onChange={(e) => setPosition(e.target.value)} className="sm:col-span-2" />
      </form>
    </Modal>
  )
}
