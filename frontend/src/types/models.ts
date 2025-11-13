export type User = {
  id: number
  name: string
  email: string
  phone?: string
  password?: string
}

export enum TransactionStatus {
  PENDENTE = 'PENDENTE',
  QUITADA = 'QUITADA',
  ATRASADA = 'ATRASADA'
}

export type Transaction = {
  id: number
  value: number
  description?: string
  dueDate: string // ISO
  paymentDate?: string | null // ISO
  creditorId: number
  debtorId: number
  status: TransactionStatus
}

export type NotificationTransaction = {
  id: number
  transactionId: number
  sentAt: string
  toUserId: number
  message: string
}
