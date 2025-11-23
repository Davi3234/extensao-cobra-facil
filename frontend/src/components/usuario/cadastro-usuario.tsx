'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Toolbar } from '@/components/ui/toolbar'
import { RegistrarUsuarioData, registrarUsuarioSchema } from '@/lib/schemas/usuario'
import { UsuarioService } from '@/services/UsuarioService'
import { Usuario } from '@/types/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertOctagon, Save, X } from 'lucide-react'
import { useForm } from 'react-hook-form'

const usuarioService = new UsuarioService()

export type CadastroUsuarioPageProps = {
  usuario?: Usuario
}

export default function CadastroUsuario({ usuario }: CadastroUsuarioPageProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<RegistrarUsuarioData>({
    resolver: zodResolver(registrarUsuarioSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const onCreate = (data: RegistrarUsuarioData) => {
    usuarioService.create(data)
      .then(() => {
        reset()
      })
  }

  const onUpdate = (data: RegistrarUsuarioData) => {
    if (!usuario) {
      return
    }

    usuarioService.update(usuario.id, data).then(() => {
      reset()
    })
  }

  return (
    <form onSubmit={handleSubmit(usuario ? onUpdate : onCreate)} className="bg-white p-4 rounded shadow space-y-3">
      <h2 className="font-semibold">{usuario ? 'Editar Usuário' : 'Novo Usuário'}</h2>

      <InputGroup>
        <InputGroupInput {...register('nome')} type="text" id="nome" />
        <InputGroupAddon align="block-start">
          <Label htmlFor="nome">Nome <span className='text-red-600'>*</span></Label>
        </InputGroupAddon>
      </InputGroup>

      {errors.nome
        && <Alert variant="field-error">
          <AlertOctagon />
          <AlertDescription>{errors.nome?.message}</AlertDescription>
        </Alert>}

      <InputGroup>
        <InputGroupInput {...register('email')} type="text" id="email" />
        <InputGroupAddon align="block-start">
          <Label htmlFor="email">Email <span className='text-red-600'>*</span></Label>
        </InputGroupAddon>
      </InputGroup>

      {errors.email
        && <Alert variant="field-error">
          <AlertOctagon />
          <AlertDescription>{errors.email?.message}</AlertDescription>
        </Alert>}

      {!usuario && (<>
        <InputGroup>
          <InputGroupInput {...register('senha')} type="password" id="senha" />
          <InputGroupAddon align="block-start">
            <Label htmlFor="senha">Senha <span className='text-red-600'>*</span></Label>
          </InputGroupAddon>
        </InputGroup>

        {errors.senha
          && <Alert variant="field-error">
            <AlertOctagon />
            <AlertDescription>{errors.senha?.message}</AlertDescription>
          </Alert>}
      </>)}

      <InputGroup>
        <InputGroupInput {...register('telefone')} type="tel" id="telefone" />
        <InputGroupAddon align="block-start">
          <Label htmlFor="telefone">Telefone</Label>
        </InputGroupAddon>
      </InputGroup>

      <Toolbar>
        {!usuario
          ? <Button disabled={isSubmitting} type="submit" className='flex gap-2 items-center'><Save size={22} /> Criar</Button>
          : (
            <>
              <Button disabled={isSubmitting} type="submit" className='flex gap-2 items-center'><Save size={22} /> Atualizar</Button>
              <Button type="button" onClick={() => reset()} className='flex gap-2 items-center bg-red-700'><X size={22} /> Cancelar</Button>
            </>
          )
        }
      </Toolbar>
    </form>
  )
}
