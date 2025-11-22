'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { TransacaoStatus } from '@/types/models'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { ReactNode, useId, useState } from 'react'

export type UsuarioComboboxProps = {
  label?: ReactNode
  value?: TransacaoStatus
  onChange?: (value: TransacaoStatus) => void
}

const statusList = [
  { label: 'Pendente', value: TransacaoStatus.PENDENTE },
  { label: 'Quitado', value: TransacaoStatus.QUITADA },
  { label: 'Atrasado', value: TransacaoStatus.ATRASADA },
]

export function TransactionStatusCombobox({ label, value, onChange }: UsuarioComboboxProps) {
  const id = useId()
  const [open, setOpen] = useState(false)

  const statusSelecionado = statusList.find(status => status.value == value)

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id}>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button id={id} variant='outline' role='combobox' aria-expanded={open} className='w-full justify-between'>
            {statusSelecionado ? (
              <span className='flex gap-2'>
                <span className='font-medium'>{statusSelecionado.label}</span>
              </span>
            ) : (
              <span className='text-muted-foreground'>Selecionar status...</span>
            )}
            <ChevronsUpDownIcon className='text-muted-foreground/80 shrink-0' aria-hidden='true' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[300px] p-0'>
          <Command>
            <CommandInput placeholder='Search user...' />
            <CommandList>
              <CommandGroup>
                {statusList.map(status => (
                  <CommandItem
                    key={status.value}
                    value={status.value.toString()}
                    onSelect={(currentValue) => {
                      if (onChange) {
                        onChange((currentValue as any) == value ? TransacaoStatus.PENDENTE : (currentValue as any) as TransacaoStatus)
                      }
                      setOpen(false)
                    }}
                  >
                    <span className='flex items-center gap-2'>
                      <span className='flex flex-col'>
                        <span className='font-medium'>{status.label}</span>
                      </span>
                    </span>
                    {value == status.value && <CheckIcon size={16} className='ml-auto' />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
