'use client'

import { HandCoins, Trash } from 'lucide-react'
import { useTransition } from 'react'

import { Button } from '@/components/button'
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
import { useCurrentUsuario } from '@/hooks/useCurrentUsuario'
import { useNotification } from '@/hooks/useNotification'
import { excluirTransacaoAction, quitarTransacaoAction } from '@/lib/actions/transaction'
import { getDescricaoTransacaoStatus, TransacaoStatus, TransacaoWithUsuario } from '@/types/models'

export type TransacoesContentProps = {
  transacoes: TransacaoWithUsuario[]
  disabled?: boolean
}

export default function TransacoesContent({ transacoes, disabled }: TransacoesContentProps) {
  const { usuario } = useCurrentUsuario()
  const { transacaoSelecionada, setTransacaoSelecionada } = useTransacoes()
  const { notify } = useNotification()
  const [isPending, startTransition] = useTransition()

  const quitarTransacao = (id: number) => {
    startTransition(async () => {
      try {
        const response = await quitarTransacaoAction(id)

        if (response.ok) {
          notify({ type: 'success', message: 'Transação quitada com sucesso.' })
        } else {
          notify({ type: 'error', message: response.error || 'Erro ao quitar transação.' })
        }
      } catch (err) {
        notify({ type: 'error', message: 'Erro ao quitar transação.' })
      }
    })
  }

  const excluirTransacao = (id: number) => {
    startTransition(async () => {
      try {
        const response = await excluirTransacaoAction(id)

        if (response.ok) {
          notify({ type: 'success', message: 'Transação excluída com sucesso.' })
        } else {
          notify({ type: 'error', message: response.error || 'Erro ao excluir transação.' })
        }
      } catch (err) {
        notify({ type: 'error', message: 'Erro ao excluir transação.' })
      }
    })
  }

  const disabledContent = isPending || disabled

  return (
    <div className='grid grid-cols-2 gap-4'>
      <CadastroTransacao transacao={transacaoSelecionada} onSuccess={() => setTransacaoSelecionada(undefined)} disabled={isPending} />

      <div className='bg-white p-4 rounded shadow'>
        <h2 className='font-semibold mb-2'>Lista</h2>

        <div className='space-y-2'>
          {transacoes.map(transacao => {
            const isRecebeTransacao = transacao.usuarioCredor.id == usuario?.id

            return (
              <div key={transacao.id} className='p-2 border rounded flex justify-between items-center'>
                <div className='flex items-center gap-4 w-full'>
                  <div>
                    <div className='font-medium'>
                      <span className={isRecebeTransacao ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                        R$ {transacao.valor.toFixed(2)}
                      </span> — {transacao.descricao}
                    </div>
                    <div className='text-xs text-gray-500'>
                      {transacao.dataVencimento
                        ? `Venc.: ${new Date(transacao.dataVencimento).toLocaleDateString('pt-BR')}`
                        : 'Sem data de venc.'} • Status: {getDescricaoTransacaoStatus(transacao.status)}
                    </div>
                  </div>

                  <span>
                    {isRecebeTransacao
                      ? (<>De: {transacao.usuarioDevedor.nome}</>)
                      : (<>Para: {transacao.usuarioCredor.nome}</>)}
                  </span>
                </div>

                <div className='flex gap-1'>
                  {transacao.status !== TransacaoStatus.QUITADA
                    && <Button
                      variant={'ghost'}
                      onClick={() => quitarTransacao(transacao.id)}
                      className='text-green-600 hover:text-green-500'
                      size={'icon'}
                      disabled={disabledContent}
                      title="Quitar"
                    >
                      <HandCoins />
                    </Button>
                  }

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant={'ghost'} className='text-red-600 hover:text-red-500' size={'icon'} disabled={disabledContent} title='Excluir'>
                        <Trash />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Deseja realmente excluir a transação?</AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction className='bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60' onClick={() => excluirTransacao(transacao.id)}>Excluir</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )
          })}

          {transacoes.length === 0 && <div className='text-sm text-gray-500'>Nenhuma transação.</div>}
        </div>
      </div>
    </div>
  )
}
