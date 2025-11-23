'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertOctagon, Calendar as CalendarIcon, Save, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { InputGroup } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { Toolbar } from '@/components/ui/toolbar'
import { UsuarioCombobox } from '@/components/usuario/usuario-combobox'
import { formatPtBR } from '@/lib/date'
import { RegistrarTransacaoData, registrarTransacaoSchema } from '@/lib/schemas/transacao'
import { TransacaoService } from '@/services/TransacaoService'
import { Transacao } from '@/types/models'

const transacaoService = new TransacaoService()

export type CadastroTransacaoProps = {
  transacao?: Transacao
}

export default function CadastroTransacao({ transacao }: CadastroTransacaoProps) {
  const { control, register, handleSubmit, getValues, formState: { errors }, reset } = useForm<RegistrarTransacaoData>({
    resolver: zodResolver(registrarTransacaoSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      valor: 0
    }
  })

  const onCreate = (data: RegistrarTransacaoData) => {
    transacaoService.create(data)
      .then(() => {
        reset()
      })
  }

  const onUpdate = (data: RegistrarTransacaoData) => {
    if (!transacao) {
      return
    }

    transacaoService.update(transacao.id, data as any).then(() => reset())
  }

  return (
    <form onSubmit={handleSubmit(transacao ? onUpdate : onCreate)} className="flex flex-col gap-4 bg-white p-4 rounded shadow">
      <h2 className="font-semibold">{transacao ? 'Editar Transação' : 'Nova Transação'}</h2>

      <InputGroup>
        <Label htmlFor="valor">Valor (R$)<span className='text-red-600'>*</span></Label>
        <Input id="valor" {...register('valor')} />

        {errors.valor
          && <Alert variant="field-error">
            <AlertOctagon />
            <AlertDescription>{errors.valor?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea id="descricao" className='resize-none' {...register('descricao')} />

        {errors.descricao
          && <Alert variant="field-error">
            <AlertOctagon />
            <AlertDescription>{errors.descricao?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="dataVencimento">Data de Vencimento</Label>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" data-empty={!getValues('dataVencimento')} className="text-foreground w-[280px] justify-start text-left font-normal">
              <CalendarIcon />
              {getValues('dataVencimento') ? formatPtBR(getValues('dataVencimento')!) : <span>Selecione a uma data</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent id='dataVencimento' className="w-auto p-0">
            <Controller
              name="dataVencimento"
              control={control}
              render={({ field }) => (
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                />
              )}
            />
          </PopoverContent>
        </Popover>

        {errors.dataVencimento
          && <Alert variant="field-error">
            <AlertOctagon />
            <AlertDescription>{errors.dataVencimento?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      <InputGroup>
        <Controller
          name="creditorId"
          control={control}
          render={({ field }) => (<>
            <Label htmlFor="debtorId">Credor <span className='text-red-600'>*</span></Label>
            <UsuarioCombobox
              value={field.value as any}
              onChange={field.onChange}
            />
          </>)}
        />

        {errors.creditorId
          && <Alert variant="field-error">
            <AlertOctagon />
            <AlertDescription>{errors.creditorId?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      <InputGroup>
        <Controller
          name="debtorId"
          control={control}
          render={({ field }) => (<>
            <Label htmlFor="debtorId">Devedor <span className='text-red-600'>*</span></Label>
            <UsuarioCombobox
              value={field.value as any}
              onChange={field.onChange}
            />
          </>)}
        />

        {errors.debtorId
          && <Alert variant="field-error">
            <AlertOctagon />
            <AlertDescription>{errors.debtorId?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      <Toolbar>
        <Button type="submit"><Save size={22} /> {transacao ? 'Atualizar' : 'Criar'}</Button>
        {transacao && <Button type="button" onClick={() => reset()}><X size={22} /> Cancelar</Button>}
      </Toolbar>
    </form>
  )
}
