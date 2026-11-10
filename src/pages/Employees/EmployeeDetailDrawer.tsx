import { useNavigate } from 'react-router-dom'
import { CalendarCheck, Mail, Phone, Building2, ArrowRight } from 'lucide-react'
import type { Employee } from '../../types'
import { Badge, statusTone } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Drawer } from '../../components/ui/Drawer'
import { formatDate, initials } from '../../utils/format'

interface EmployeeDetailDrawerProps {
  employee: Employee | null
  onClose: () => void
}

export function EmployeeDetailDrawer({ employee, onClose }: EmployeeDetailDrawerProps) {
  const navigate = useNavigate()

  return (
    <Drawer open={Boolean(employee)} onClose={onClose} title="Employee Details">
      {employee ? (
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3.5">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-blue-600 text-base font-semibold text-white">
              {initials(employee.name)}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-slate-900 dark:text-slate-50">{employee.name}</h3>
              <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                {employee.position} · {employee.department}
              </p>
              <div className="mt-1.5">
                <Badge tone={statusTone(employee.status)}>{employee.status}</Badge>
              </div>
            </div>
          </div>

          <dl className="rounded-xl border border-slate-200 dark:border-slate-800">
            {[
              { icon: Mail, label: 'Email', value: employee.email },
              { icon: Phone, label: 'Phone', value: employee.phone },
              { icon: Building2, label: 'Department', value: employee.department },
              { icon: CalendarCheck, label: 'Join Date', value: formatDate(employee.joinDate) },
            ].map(({ icon: Icon, label, value }, i) => (
              <div
                key={label}
                className={
                  'flex items-center gap-3 px-4 py-3' + (i > 0 ? ' border-t border-slate-200 dark:border-slate-800' : '')
                }
              >
                <Icon className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                <dt className="w-24 shrink-0 text-xs font-medium text-slate-500 dark:text-slate-400">{label}</dt>
                <dd className="min-w-0 flex-1 truncate text-sm text-slate-800 dark:text-slate-100">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => {
                onClose()
                navigate('/attendance')
              }}
            >
              View attendance
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
            <Button size="sm" variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Employee ID <span className="font-medium text-slate-500 dark:text-slate-400">{employee.id}</span> — profile data is mock data for the demo build.
          </p>
        </div>
      ) : null}
    </Drawer>
  )
}
