'use client'

import { Transacao } from '@/types/models'
import { createContext, ReactNode, useContext, useState } from 'react'

export type TransacoesContextType = {
  transacaoSelecionada: Transacao | undefined
  setTransacaoSelecionada: (t: Transacao | undefined) => void
}

const TransacoesContext = createContext<TransacoesContextType | undefined>(undefined)

export function TransacoesProvider({ children }: { children: ReactNode }) {
  const [transacaoSelecionada, setTransacaoSelecionada] = useState<Transacao | undefined>()

  return (
    <TransacoesContext.Provider value={{ transacaoSelecionada, setTransacaoSelecionada }}>
      {children}
    </TransacoesContext.Provider>
  )
}

export function useTransacoes() {
  const ctx = useContext(TransacoesContext)
  if (!ctx) throw new Error('useTransacoes must be used inside TransacoesProvider')
  return ctx
}

export default TransacoesProvider
