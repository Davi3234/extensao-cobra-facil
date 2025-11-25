import { ArrowRightLeft, ArrowUpFromLine } from 'lucide-react'
import { ReactElement } from 'react'

import { calcularSaldoAction } from '@/lib/actions/relatorio'

function Card({ label, subtext, icon }: { label: string, subtext?: string, icon?: ReactElement }) {
  return <div className="bg-white p-4 rounded shadow flex">
    <div className='w-full'>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-xl font-semibold">{subtext}</div>
    </div>

    {icon}
  </div>
}

export default async function DashboardPage() {
  const saldo = (await calcularSaldoAction()).value || {
    totalReceber: 0,
    totalPagar: 0,
    saldoGeral: 0
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <Card
          label='Total a Receber'
          subtext={`R$ ${saldo.totalReceber.toFixed(2)}`}
          icon={<ArrowUpFromLine color='#388e4a' size={32} className='my-auto' />}
        />

        <Card
          label='Total a Pagar'
          subtext={`R$ ${saldo.totalPagar.toFixed(2)}`}
          icon={<ArrowUpFromLine color='#da3036' size={32} className='my-auto' />}
        />

        <Card
          label='Saldo Geral'
          subtext={`${saldo.saldoGeral}`}
          icon={<ArrowRightLeft size={32} className='my-auto' />}
        />
      </div>
    </div>
  )
}
