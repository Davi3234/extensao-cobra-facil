'use server'

import { Users } from 'lucide-react'

import TransacoesContent from '@/components/transacao/transacoes-content'
import { TransacoesProvider } from '@/context/Transacoes'
import { buscarTransacoesAction } from '@/lib/actions/transaction'

export default async function TransacoesPage() {
  const response = await buscarTransacoesAction()
  const transacoes = response.ok ? response.value : []

  return (
    <div>
      <div className='flex gap-2'>
        <Users />
        <h1 className='text-xl font-bold mb-4'>Transações</h1>
      </div>

      <TransacoesProvider>
        <TransacoesContent transacoes={transacoes} />
      </TransacoesProvider>
    </div>
  )
}
