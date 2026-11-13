import { Box, Building2, Calendar, CircleCheck, CircleX, Star } from 'lucide-react'
import type { PurchaseRequest } from '../../types'
import { Badge, statusTone } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Drawer } from '../../components/ui/Drawer'
import { formatCurrency, formatDate } from '../../utils/format'
import { useTranslation } from 'react-i18next'

interface PrDetailDrawerProps {
  request: PurchaseRequest | null
  onClose: () => void
  onDecide: (id: string, decision: 'Approved' | 'Rejected') => void
}

export function PrDetailDrawer({ request, onClose, onDecide }: PrDetailDrawerProps) {
  const { t } = useTranslation()
  return (
    <Drawer open={Boolean(request)} onClose={onClose} title={t('Purchase Request Detail')}>
      {request ? (
        <div className="flex flex-col gap-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">{t(request.itemName)}</h3>
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                {request.id} · {t('raised by')} {request.requester}
              </p>
            </div>
            <Badge tone={statusTone(request.status)}>{request.status}</Badge>
          </div>

          <dl className="rounded-xl border border-slate-200 dark:border-slate-800">
            {[
              { icon: Building2, label: 'Department', value: request.department },
              { icon: Box, label: 'Qty', value: String(request.qty) },
              { icon: Star, label: 'Estimated Cost', value: formatCurrency(request.estCost) },
              { icon: Calendar, label: 'Request Date', value: formatDate(request.date) },
            ].map(({ icon: Icon, label, value }, i) => (
              <div
                key={label}
                className={'flex items-center gap-3 px-4 py-3' + (i > 0 ? ' border-t border-slate-200 dark:border-slate-800' : '')}
              >
                <Icon className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                <dt className="w-32 shrink-0 text-xs font-medium text-slate-500 dark:text-slate-400">{t(label)}</dt>
                <dd className="min-w-0 flex-1 truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          {request.priority === 'Urgent' ? (
            <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700 dark:bg-red-500/10 dark:text-red-400">
              {t('Marked urgent by the requester — review before the weekly order cut-off.')}
            </p>
          ) : null}

          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => onDecide(request.id, 'Approved')}>
              <CircleCheck className="h-4 w-4" />
              {t('Approve')}
            </Button>
            <Button size="sm" variant="danger" onClick={() => onDecide(request.id, 'Rejected')}>
              <CircleX className="h-4 w-4" />
              {t('Reject')}
            </Button>
            <Button size="sm" variant="secondary" onClick={onClose}>
              {t('Close')}
            </Button>
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500">
            {t('Decisions update the local mock list for this demo session — no supplier is contacted.')}
          </p>
        </div>
      ) : null}
    </Drawer>
  )
}
