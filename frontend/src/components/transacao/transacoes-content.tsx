'use client'

import { HandCoins, Trash } from 'lucide-react'

import { CadastroTransacao } from '@/components/transacao/cadastro-transacao'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { useTransacoes } from '@/context/Transacoes'
import { excluirTransacaoAction, quitarTransacaoAction } from '@/lib/actions/transaction'
import { getDescricaoTransacaoStatus, TransacaoStatus, TransacaoWithUsuario } from '@/types/models'

export type TransacoesContentProps = {
  transacoes: TransacaoWithUsuario[]
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
                <div className='text-xs text-gray-500'>
                  {transacao.dataVencimento
                    ? `Venc.: ${new Date(transacao.dataVencimento).toLocaleDateString()}`
                    : 'Sem data de venc.'} • Status: {getDescricaoTransacaoStatus(transacao.status)}
                </div>
              </div>

              <div className='flex gap-2'>
                {transacao.status !== TransacaoStatus.QUITADA && <button onClick={() => quitarTransacaoAction(transacao.id)} className='text-green-600 text-sm'><HandCoins /></button>}

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className='text-red-600 text-sm'><Trash /></button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Deseja excluir a transação?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => excluirTransacaoAction(transacao.id)}>Confirmar</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}

          {transacoes.length === 0 && <div className='text-sm text-gray-500'>Nenhuma transação.</div>}
        </div>
      </div>
    </div>
  )
}
