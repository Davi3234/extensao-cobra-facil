'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertOctagon, Calendar as CalendarIcon, Save, X } from 'lucide-react'
import { useContext, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { InputGroup } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RequiredSymbol } from '@/components/ui/required-symbol'
import { Textarea } from '@/components/ui/textarea'
import { Toolbar } from '@/components/ui/toolbar'
import { UsuarioCombobox } from '@/components/usuario/usuario-combobox'
import { NotificationContext } from '@/context/NotificationContext'
import { cadastrarTransacaoAction } from '@/lib/actions/transaction'
import { formatPtBR } from '@/lib/date'
import { RegistrarTransacaoData, registrarTransacaoSchema } from '@/lib/schemas/transacao'
import { TransacaoWithUsuario } from '@/types/models'

export type CadastroTransacaoProps = {
  transacao?: TransacaoWithUsuario
  onSuccess?: () => void
  disabled?: boolean
}

export function CadastroTransacao({ transacao, onSuccess, disabled }: CadastroTransacaoProps) {
  const { control, register, handleSubmit, getValues, formState: { errors }, reset } = useForm<RegistrarTransacaoData>({
    resolver: zodResolver(registrarTransacaoSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      valor: transacao?.valor || 0,
      credorId: transacao?.usuarioCredor.id,
      devedorId: transacao?.usuarioDevedor.id,
      descricao: transacao?.descricao || '',
      dataVencimento: transacao?.dataVencimento ? new Date(transacao.dataVencimento) : undefined
    }
  })

  const { notify } = useContext(NotificationContext)
  const [isPending, startTransition] = useTransition()

  const cadastrar = (data: RegistrarTransacaoData) => {
    startTransition(async () => {
      try {
        const result = await cadastrarTransacaoAction(data)

        if (result.ok) {
          reset()
          notify({ type: 'success', message: 'Transação criada' })
          onSuccess?.()
        } else {
          notify({ type: 'error', message: result.error || 'Erro ao criar transação' })
        }
      } catch (err) {
        notify({ type: 'error', message: 'Erro ao criar transação' })
      }
    })
  }

  const atualizar = (data: RegistrarTransacaoData) => {
    if (!transacao) return
  }

  const disableForm = isPending || disabled

  return (
    <form onSubmit={handleSubmit(transacao ? atualizar : cadastrar)} className="flex flex-col gap-4 bg-white p-4 rounded shadow">
      <h2 className="font-semibold">{transacao ? 'Editar Transação' : 'Nova Transação'}</h2>

      <InputGroup>
        <Label htmlFor="valor">Valor (R$) <RequiredSymbol /></Label>
        <Input id="valor" {...register('valor')} disabled={disableForm} />

        {errors.valor
          && <Alert variant="field-error">
            <AlertOctagon />
            <AlertDescription>{errors.valor?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea id="descricao" className='resize-none' {...register('descricao')} disabled={disableForm} />

        {errors.descricao
          && <Alert variant="field-error">
            <AlertOctagon />
            <AlertDescription>{errors.descricao?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="dataVencimento">Data de Vencimento</Label>

        <Controller
          name="dataVencimento"
          control={control}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" data-empty={!getValues('dataVencimento')} className="text-foreground w-[280px] justify-start text-left font-normal" disabled={disableForm}>
                  <CalendarIcon />
                  {getValues('dataVencimento') ? formatPtBR(getValues('dataVencimento')!) : <span>Selecione a uma data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent id='dataVencimento' className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                />
              </PopoverContent>
            </Popover>
          )}
        />

        {errors.dataVencimento
          && <Alert variant="field-error">
            <AlertOctagon />
            <AlertDescription>{errors.dataVencimento?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      <InputGroup>
        <Controller
          name="credorId"
          control={control}
          render={({ field }) => (<>
            <Label htmlFor="credorId">Credor <RequiredSymbol /></Label>
            <UsuarioCombobox
              value={field.value as any}
              onChange={field.onChange}
            />
          </>)}
        />

        {errors.credorId
          && <Alert variant="field-error">
            <AlertOctagon />
            <AlertDescription>{errors.credorId?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      <InputGroup>
        <Controller
          name="devedorId"
          control={control}
          render={({ field }) => (<>
            <Label htmlFor="devedorId">Devedor <RequiredSymbol /></Label>
            <UsuarioCombobox
              value={field.value as any}
              onChange={field.onChange}
            />
          </>)}
        />

        {errors.devedorId
          && <Alert variant="field-error">
            <AlertOctagon />
            <AlertDescription>{errors.devedorId?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      <Toolbar>
        <Button type="submit" disabled={disableForm}><Save size={22} /> {isPending ? 'Enviando...' : (transacao ? 'Atualizar' : 'Criar')}</Button>
        {transacao && <Button type="button" onClick={() => { reset(); onSuccess?.() }} disabled={disableForm}><X size={22} /> Cancelar</Button>}
      </Toolbar>
    </form>
  )
}
