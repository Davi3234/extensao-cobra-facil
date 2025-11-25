'use client'

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { ComponentProps, useEffect, useId, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { buscarUsuariosAction } from '@/lib/actions/usuario'
import { cn } from '@/lib/utils'
import { Usuario } from '@/types/models'

export type UsuarioComboboxProps = {
  value?: string | number
  onChange?: (value: string | number) => void
} & ComponentProps<'div'>

export function UsuarioCombobox({ value, onChange, className, ...props }: UsuarioComboboxProps) {
  const id = useId()
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [open, setOpen] = useState(false)

  const refresh = () => {
    buscarUsuariosAction().then(response => {
      if (response.ok) {
        setUsuarios(response.value)
      }
    })
  }

  useEffect(() => {
    refresh()
  }, [])

  const usuarioSelecionado = usuarios.find(usuario => usuario.nome === value)

  return (
    <div className={cn('w-full max-w-xs space-y-2', className)} {...props}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button id={id} variant='outline' role='combobox' aria-expanded={open} className='w-full justify-between'>
            {usuarioSelecionado ? (
              <span className='flex gap-2'>
                <span className='font-medium'>{usuarioSelecionado.nome}</span>
              </span>
            ) : (
              <span className='text-muted-foreground'>Selecionar usuário...</span>
            )}
            <ChevronsUpDownIcon className='text-muted-foreground/80 shrink-0' aria-hidden='true' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[300px] p-0'>
          <Command>
            <CommandInput placeholder='Buscar usuário...' />
            <CommandList>
              <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>
              <CommandGroup>
                {usuarios.map(usuario => (
                  <CommandItem
                    key={usuario.nome}
                    value={usuario.nome}
                    onSelect={currentValue => {
                      if (onChange) {
                        onChange(currentValue === value ? '' : currentValue)
                      }
                      setOpen(false)
                    }}
                  >
                    <span className='flex items-center gap-2'>
                      <span className='flex flex-col'>
                        <span className='font-medium'>{usuario.nome}</span>
                        <span className='text-muted-foreground text-sm'>{usuario.email}</span>
                      </span>
                    </span>
                    {value === usuario.nome && <CheckIcon size={16} className='ml-auto' />}
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
