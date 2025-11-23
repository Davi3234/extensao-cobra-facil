'use client'

import { RelatorioService } from '@/services/RelatorioService'
import { useEffect, useState } from 'react'

const relatorioService = new RelatorioService()

export default function RelatoriosPage() {
  const [estatisticas, setEstatisticas] = useState({
    saldo: {
      totalReceber: 0,
      totalPagar: 0,
      transacoesCount: 0,
    },
    quitadasCount: 0,
    atrasadasCount: 0,
  })

  useEffect(() => {
    relatorioService.getEstatisticas().then(estatisticas => setEstatisticas(estatisticas))
  }, [])

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Relatórios</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Saldo geral</div>
          <div className="text-xl font-semibold">R$ {estatisticas.saldo.totalReceber.toFixed(2)} a receber<br />R$ {estatisticas.saldo.totalPagar.toFixed(2)} a pagar</div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Quitadas</div>
          <div className="text-xl font-semibold">{estatisticas.quitadasCount}</div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Atrasadas</div>
          <div className="text-xl font-semibold">{estatisticas.atrasadasCount}</div>
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Detalhes</h2>
        <div className="text-sm text-gray-600">Relatórios simples com filtros básicos implementáveis via serviços.</div>
      </div>
    </div>
  )
}
