'use client'

import { Notification } from '@/components/ui/notification'
import { NotificationContext } from '@/context/NotificationContext'
import { useContext } from 'react'

export function NotificationTray() {
  const { notifications } = useContext(NotificationContext)

  if (!notifications || notifications.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-full pointer-events-none">
      <div className="flex flex-col gap-3">
        {notifications.map(notification => (
          <div key={notification.id} className="pointer-events-auto">
            <Notification notification={notification} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotificationTray
