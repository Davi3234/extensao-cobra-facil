'use client'

import { createContext, ReactNode, useState } from 'react'

export interface NotificationType {
  id: string
  type?: 'info' | 'success' | 'warning' | 'error'
  title?: ReactNode
  message: ReactNode
}

export interface NotificationContextType {
  notifications: NotificationType[]
  notify: (notification: Omit<NotificationType, 'id'>) => string
  closeNotification: (id: string) => void
}

export const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  notify: () => '',
  closeNotification: () => { },
})

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([])

  const notify = (notification: Omit<NotificationType, 'id'>) => {
    const newNotification = { ...notification, title: notification.title || getDescricaoTypeNotification(notification.type || 'info'), id: crypto.randomUUID() }

    setNotifications(notifications => [...notifications, newNotification])

    return newNotification.id
  }

  const closeNotification = (id: string) => {
    setNotifications(notifications => notifications.filter(notification => notification.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ notifications, notify, closeNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

function getDescricaoTypeNotification(type: string) {
  switch (type) {
    case 'info': return 'Info'
    case 'success': return 'Sucesso'
    case 'warning': return 'Alerta'
    case 'error': return 'Erro'
  }
  return ''
}
