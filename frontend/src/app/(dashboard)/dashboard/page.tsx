'use client'

import { RelatorioService } from '@/services/RelatorioService'
import { ArrowRightLeft, ArrowUpFromLine } from 'lucide-react'
import { ReactElement, useEffect, useState } from 'react'

const relatorioService = new RelatorioService()

function Card({ label, subtext, icon }: { label: string, subtext?: string, icon?: ReactElement }) {
  return <div className="bg-white p-4 rounded shadow flex">
    <div className='w-full'>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-xl font-semibold">{subtext}</div>
    </div>

    {icon}
  </div>
}

export default function DashboardPage() {
  const [estatisticas, setEstatisticas] = useState({
    totalReceber: 0,
    totalPagar: 0,
    transacoesCount: 0,
  })

  useEffect(() => {
    relatorioService.saldoGeral().then(estatisticas => setEstatisticas(estatisticas))
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <Card
          label='Total a Receber'
          subtext={`R$ ${estatisticas.totalReceber.toFixed(2)}`}
          icon={<ArrowUpFromLine color='#388e4a' size={32} className='my-auto' />}
        />

        <Card
          label='Total a Pagar'
          subtext={`R$ ${estatisticas.totalPagar.toFixed(2)}`}
          icon={<ArrowUpFromLine color='#da3036' size={32} className='my-auto' />}
        />

        <Card
          label='Total a Receber'
          subtext={`${estatisticas.transacoesCount}`}
          icon={<ArrowRightLeft size={32} className='my-auto' />}
        />
      </div>
    </div>
  )
}
