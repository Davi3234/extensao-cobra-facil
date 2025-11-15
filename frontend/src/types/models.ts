export type Usuario = {
  id: number
  nome: string
  email: string
  telefone?: string
  senha?: string
  ativo: number
}

export enum TransacaoStatus {
  PENDENTE = 1,
  QUITADA = 2,
  ATRASADA = 3,
}

export type Transacao = {
  id: number
  valor: number
  descricao?: string
  dataVencimento: string // ISO
  dataPagamento?: string | null // ISO
  creditorId: number
  debtorId: number
  status: TransacaoStatus
}

export type NotificationTransacao = {
  id: number
  transacaoId: number
  dataEnvio: string
  toUsuarioId: number
  mensagem: string
}
