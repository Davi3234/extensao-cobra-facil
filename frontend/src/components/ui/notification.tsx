'use client'

import { Check, Info, OctagonX, TriangleAlert, X } from 'lucide-react'
import { ComponentProps, useContext, useEffect } from 'react'

import { NotificationContext, NotificationType } from '@/context/NotificationContext'
import { cn } from '@/lib/utils'

export type NotificationProps = {
  notification: NotificationType
  onClose?: (notification: NotificationType) => void
  autoClose?: boolean
  autoCloseDelay?: number
} & ComponentProps<'div'>

const variantClasses = {
  info: 'border-blue-400',
  success: 'border-green-400',
  warning: 'border-yellow-400',
  error: 'border-red-400',
} as const

export function Notification({
  notification,
  onClose,
  autoClose = true,
  autoCloseDelay = 5000,
  className,
  ...props
}: NotificationProps) {
  const ctx = useContext(NotificationContext)

  const variant = notification.type || 'info'

  const handleClose = () => {
    if (onClose) {
      onClose(notification)
    }
    else {
      ctx.closeNotification(notification.id)
    }
  }

  useEffect(() => {
    if (!autoClose) {
      return
    }

    const id = setTimeout(handleClose, autoCloseDelay)

    return () => clearTimeout(id)
  }, [notification.id, autoClose, autoCloseDelay, onClose, ctx])

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'w-full border-2 rounded-md shadow-sm p-3 flex items-start gap-3 bg-white',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <div className="shrink-0">
        <IconForVariant variant={variant} />
      </div>
      <div className="flex-1 min-w-0">
        {notification.title && <div className="font-medium text-sm">{notification.title}</div>}
        {notification.message && <div className="text-sm text-muted-foreground">{notification.message}</div>}
      </div>
      <div className="shrink-0 ml-2">
        <button aria-label="Close notification" onClick={handleClose} className="p-1 rounded hover:bg-slate-100">
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

function IconForVariant({ variant }: { variant?: NotificationType['type'] }) {
  switch (variant) {
    case 'success':
      return <Check color={colorForVariant(variant)} size={24} />
    case 'warning':
      return <TriangleAlert color={colorForVariant(variant)} size={24} />
    case 'error':
      return <OctagonX color={colorForVariant(variant)} size={24} />
    default:
      return <Info color={colorForVariant(variant)} size={24} />
  }
}

function colorForVariant(variant?: NotificationType['type']) {
  switch (variant) {
    case 'success':
      return '#31DD74'
    case 'warning':
      return '#FFC500'
    case 'error':
      return '#FF6466'
    default:
      return '#00A4FF'
  }
}
