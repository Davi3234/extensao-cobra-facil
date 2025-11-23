'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertOctagon, Save, X } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  InputGroup
} from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Toolbar } from '@/components/ui/toolbar'
import { RegistrarUsuarioData, registrarUsuarioSchema } from '@/lib/schemas/usuario'
import { Usuario } from '@/types/models'
import { registrarUsuarioAction } from '../../lib/actions/usuario'

export type CadastroUsuarioPageProps = {
  usuario?: Usuario
}

export function CadastroUsuario({ usuario }: CadastroUsuarioPageProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegistrarUsuarioData>({
    resolver: zodResolver(registrarUsuarioSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  })

  const cadastrar = (data: RegistrarUsuarioData) => {
    registrarUsuarioAction(data)
      .then(response => {
        if (response.ok) {
          reset()
        }
      })
  }

  const atualizar = (data: RegistrarUsuarioData) => {
    if (!usuario) {
      return
    }

    // Atualizar
  }

  return (
    <form onSubmit={handleSubmit(usuario ? atualizar : cadastrar)} className="flex flex-col gap-4 bg-white p-4 rounded shadow">
      <h2 className="font-semibold">{usuario ? 'Editar Usuário' : 'Novo Usuário'}</h2>

      <InputGroup>
        <Label htmlFor="nome">Nome <span className='text-red-600'>*</span></Label>
        <Input {...register('nome')} type="text" id="nome" />

        {errors.nome
          && <Alert variant="field-error">
            <AlertOctagon />
            <AlertDescription>{errors.nome?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="email">Email <span className='text-red-600'>*</span></Label>
        <Input {...register('email')} type="text" id="email" />

        {errors.email
          && <Alert variant="field-error">
            <AlertOctagon />
            <AlertDescription>{errors.email?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      {!usuario && (
        <InputGroup>
          <Label htmlFor="senha">Senha <span className='text-red-600'>*</span></Label>
          <Input {...register('senha')} type="password" id="senha" />

          {errors.senha
            && <Alert variant="field-error">
              <AlertOctagon />
              <AlertDescription>{errors.senha?.message}</AlertDescription>
            </Alert>}
        </InputGroup>
      )}

      <InputGroup>
        <Label htmlFor="telefone">Telefone</Label>
        <Input {...register('telefone')} type="tel" id="telefone" />

        {errors.telefone
          && <Alert variant="field-error">
            <AlertOctagon />
            <AlertDescription>{errors.telefone?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      <Toolbar>
        {!usuario
          ? <Button type="submit" className='flex gap-2 items-center'><Save size={22} /> Criar</Button>
          : (
            <>
              <Button type="submit" className='flex gap-2 items-center'><Save size={22} /> Atualizar</Button>
              <Button type="button" onClick={() => reset()} className='flex gap-2 items-center bg-red-700'><X size={22} /> Cancelar</Button>
            </>
          )
        }
      </Toolbar>
    </form>
  )
}
