import { calcularSaldoAction, contarTransacaoStatus } from '@/lib/actions/relatorio'

export default async function RelatoriosPage() {
  const saldo = (await calcularSaldoAction()).value || {
    totalReceber: 0,
    totalPagar: 0,
    saldoGeral: 0
  }

  const estatisticas = (await contarTransacaoStatus()).value || {
    quitadasCount: 0,
    atrasadasCount: 0,
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Relatórios</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Saldo geral</div>
          <div className="text-xl font-semibold">R$ {saldo.totalReceber.toFixed(2)} a receber<br />R$ {saldo.totalPagar.toFixed(2)} a pagar</div>
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
