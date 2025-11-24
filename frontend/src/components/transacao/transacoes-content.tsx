'use client'

import { Edit } from 'lucide-react'

import { CadastroTransacao } from '@/components/transacao/cadastro-transacao'
import { useTransacoes } from '@/context/Transacoes'
import { excluirTransacaoAction, quitarTransacaoAction } from '@/lib/actions/transaction'
import { Transacao, TransacaoStatus } from '@/types/models'

export type TransacoesContentProps = {
  transacoes: Transacao[]
}

export default function TransacoesContent({ transacoes }: TransacoesContentProps) {
  const { transacaoSelecionada, setTransacaoSelecionada } = useTransacoes()

  return (
    <div className='grid grid-cols-2 gap-4'>
      <CadastroTransacao transacao={transacaoSelecionada} onSuccess={() => setTransacaoSelecionada(undefined)} />

      <div className='bg-white p-4 rounded shadow'>
        <h2 className='font-semibold mb-2'>Lista</h2>

        <div className='space-y-2'>
          {transacoes.map(transacao => (
            <div key={transacao.id} className='p-2 border rounded flex justify-between items-center'>
              <div>
                <div className='font-medium'>R$ {transacao.valor.toFixed(2)} — {transacao.descricao}</div>
                <div className='text-xs text-gray-500'>Venc.: {new Date(transacao.dataVencimento).toLocaleDateString()} • Status: {transacao.status}</div>
              </div>

              <div className='flex gap-2'>
                {transacao.status !== TransacaoStatus.QUITADA && <button onClick={() => quitarTransacaoAction(transacao.id)} className='text-green-600 text-sm'>Marcar Quitada</button>}
                <button onClick={() => setTransacaoSelecionada(transacao)} className='text-blue-600 text-sm'><Edit /></button>
                <button onClick={() => excluirTransacaoAction(transacao.id)} className='text-red-600 text-sm'>Remover</button>
              </div>
            </div>
          ))}

          {transacoes.length === 0 && <div className='text-sm text-gray-500'>Nenhuma transação.</div>}
        </div>
      </div>
    </div>
  )
}
