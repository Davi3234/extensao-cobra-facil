import { ReactNode } from 'react'

import { buscarTransacoesAction } from '@/lib/actions/transaction'
import { Transacao } from '@/types/models'

export type ListTransacaoProps = {
  transacao?: Transacao
  item?: (transacao: Transacao) => ReactNode
}

export default async function ListTransacao({ transacao: transacaoSelecionada, item }: ListTransacaoProps) {
  const transacoes = (await buscarTransacoesAction()).value || []

  return (
    <>
      {transacoes.map(transacao => {
        if (item) {
          return item(transacao)
        }

        return (
          <div key={transacao.id} className="p-2 border rounded flex justify-between items-center">
            <div>
              <div className="font-medium">R$ {transacao.valor.toFixed(2)} — {transacao.descricao}</div>
              <div className="text-xs text-gray-500">Venc.: {new Date(transacao.dataVencimento).toLocaleDateString()} • Status: {transacao.status}</div>
            </div>
          </div>
        )
      })}

      {transacoes.length === 0 && <div className="text-sm text-gray-500">Nenhuma transação.</div>}
    </>
  )
}
