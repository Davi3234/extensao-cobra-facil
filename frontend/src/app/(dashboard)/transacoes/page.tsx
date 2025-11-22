'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { UsuarioCombobox } from '@/components/usuario/usuario-combobox'
import { formatPtBR } from '@/lib/date'
import { TransacaoService } from '@/services/TransacaoService'
import { Transacao, TransacaoStatus } from '@/types/models'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { TransactionStatusCombobox } from '../../../components/transacao/transacao-status-combobox'

const transacaoService = new TransacaoService()

export default function TransacoesPage() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const [editing, setEditing] = useState<Transacao | null>(null)
  const [form, setForm] = useState({
    valor: '',
    descricao: '',
    dataVencimento: '',
    creditorId: '',
    debtorId: '',
    status: TransacaoStatus.PENDENTE,
  } as any)

  const refresh = () => {
    transacaoService.list().then(transacoes => setTransacoes(transacoes))
  }

  const onCreate = (e: React.FormEvent) => {
    e.preventDefault()
    const val = parseFloat(form.valor)

    if (!val || !form.dataVencimento || !form.creditorId || !form.debtorId) {
      return alert('Preencha todos os campos obrigatórios')
    }

    transacaoService.create({
      valor: val,
      descricao: form.descricao,
      dataVencimento: new Date(form.dataVencimento).toISOString(),
      creditorId: Number(form.creditorId),
      debtorId: Number(form.debtorId),
      status: form.status,
    })

    setForm({ valor: '', descricao: '', dataVencimento: '', creditorId: '', debtorId: '', status: TransacaoStatus.PENDENTE })
    refresh()
  }

  const onEdit = (transacao: Transacao) => {
    setEditing(transacao)
    setForm({
      valor: String(transacao.valor),
      descricao: transacao.descricao || '',
      dataVencimento: transacao.dataVencimento.split('T')[0],
      creditorId: String(transacao.creditorId),
      debtorId: String(transacao.debtorId),
      status: transacao.status,
    })
  }

  const onUpdate = (e: React.FormEvent) => {
    e.preventDefault()

    if (!editing) {
      return
    }

    transacaoService.update(editing.id, {
      valor: parseFloat(form.valor),
      descricao: form.descricao,
      dataVencimento: new Date(form.dataVencimento).toISOString(),
      creditorId: Number(form.creditorId),
      debtorId: Number(form.debtorId),
      status: form.status,
    })

    setEditing(null)
    setForm({ valor: '', descricao: '', dataVencimento: '', creditorId: '', debtorId: '', status: TransacaoStatus.PENDENTE })
    refresh()
  }

  const onDelete = (id: number) => {
    if (!confirm('Remover transação?')) {
      return
    }

    transacaoService.remove(id)

    refresh()
  }

  const markAsPaid = (t: Transacao) => {
    transacaoService.update(t.id, { status: TransacaoStatus.QUITADA, dataPagamento: new Date().toISOString() })

    refresh()
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Transações</h1>

      <div className="grid grid-cols-2 gap-4">
        <form onSubmit={editing ? onUpdate : onCreate} className="bg-white p-4 rounded shadow space-y-3">
          <h2 className="font-semibold">{editing ? 'Editar Transação' : 'Nova Transação'}</h2>

          <InputGroup>
            <InputGroupInput id="valor" value={form.valor} onChange={(e) => setForm({ ...form, valor: e.target.value })} />
            <InputGroupAddon align="block-start">
              <Label htmlFor="valor">Valor (R$)<span className='text-red-600'>*</span></Label>
            </InputGroupAddon>
          </InputGroup>

          <InputGroup>
            <InputGroupInput id="descricao" value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} />
            <InputGroupAddon align="block-start">
              <Label htmlFor="descricao">Descrição</Label>
            </InputGroupAddon>
          </InputGroup>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" data-empty={!form.dataVencimento} className="text-foreground w-[280px] justify-start text-left font-normal">
                <CalendarIcon />
                {form.dataVencimento ? formatPtBR(form.dataVencimento) : <span>Selecione a Data de Vencimento</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={form.dataVencimento} onSelect={data => setForm({ ...form, dataVencimento: data })} />
            </PopoverContent>
          </Popover>

          <UsuarioCombobox
            label={<>Credor <span className='text-red-600'>*</span></>}
            value={form.creditorId}
            onChange={id => setForm({ ...form, creditorId: id })}
          />

          <UsuarioCombobox
            label={<>Devedor <span className='text-red-600'>*</span></>}
            value={form.debtorId}
            onChange={id => setForm({ ...form, debtorId: id })}
          />

          <TransactionStatusCombobox
            label={<>Situação <span className='text-red-600'>*</span></>}
            value={form.status}
            onChange={status => setForm({ ...form, status })}
          />

          <Button type="submit">{editing ? 'Atualizar' : 'Criar'}</Button>

          {editing && <Button type="button" onClick={() => { setEditing(null); setForm({ valor: '', descricao: '', dataVencimento: '', creditorId: '', debtorId: '', status: TransacaoStatus.PENDENTE }) }}>Cancelar</Button>}
        </form>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Lista</h2>

          <div className="space-y-2">
            {transacoes.map(transacao => (
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
            ))}

            {transacoes.length === 0 && <div className="text-sm text-gray-500">Nenhuma transação.</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
