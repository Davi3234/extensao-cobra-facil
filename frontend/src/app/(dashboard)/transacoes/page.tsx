'use client'

import { useState } from 'react'

import CadastroTransacao from '@/components/transacao/cadastro-transacao'
import ListTransacao from '@/components/transacao/list-usuario'
import { TransacaoService } from '@/services/TransacaoService'
import { Transacao, TransacaoStatus } from '@/types/models'

const transacaoService = new TransacaoService()

export default function TransacoesPage() {
  const [transacaoSelecionada, setTransacaoSelecionada] = useState<Transacao | undefined>()

  const onEdit = (transacao: Transacao) => {
    setTransacaoSelecionada(transacao)
  }

  const onDelete = (id: number) => {
    if (!confirm('Remover transação?')) {
      return
    }

    transacaoService.remove(id)
  }

  const markAsPaid = (t: Transacao) => {
    transacaoService.update(t.id, { status: TransacaoStatus.QUITADA, dataPagamento: new Date().toISOString() })
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Transações</h1>

      <div className="grid grid-cols-2 gap-4">
        <CadastroTransacao transacao={transacaoSelecionada} />

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Lista</h2>

          <div className="space-y-2">
            <ListTransacao
              item={transacao => (
                <div key={transacao.id} className="p-2 border rounded flex justify-between items-center">
                  <div>
                    <div className="font-medium">R$ {transacao.valor.toFixed(2)} — {transacao.descricao}</div>
                    <div className="text-xs text-gray-500">Venc.: {new Date(transacao.dataVencimento).toLocaleDateString()} • Status: {transacao.status}</div>
                  </div>

                  <div className="flex gap-2">
                    {transacao.status !== TransacaoStatus.QUITADA && <button onClick={() => markAsPaid(transacao)} className="text-green-600 text-sm">Marcar Quitada</button>}
                    <button onClick={() => onEdit(transacao)} className="text-blue-600 text-sm">Editar</button>
                    <button onClick={() => onDelete(transacao.id)} className="text-red-600 text-sm">Remover</button>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
