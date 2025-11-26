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

export function getDescricaoTransacaoStatus(status: TransacaoStatus) {
  switch (status) {
    case TransacaoStatus.PENDENTE: return 'Pendente'
    case TransacaoStatus.QUITADA: return 'Quitada'
    case TransacaoStatus.ATRASADA: return 'Atrasada'
  }
  return ''
}

type TransacaoBasic = {
  id: number
  valor: number
  descricao?: string
  dataVencimento: string
  dataPagamento?: string | null
  status: TransacaoStatus
}

export type Transacao = TransacaoBasic & {
  credorId: number
  devedorId: number
}

export type TransacaoWithUsuario = TransacaoBasic & {
  usuarioCredor: Usuario
  usuarioDevedor: Usuario
}

export type NotificationTransacao = {
  id: number
  transacaoId: number
  dataEnvio: string
  toUsuarioId: number
  mensagem: string
}
