'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertOctagon, Save, X } from 'lucide-react'
import { useContext, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputGroup } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Toolbar } from '@/components/ui/toolbar'
import { NotificationContext } from '@/context/NotificationContext'
import { registrarUsuarioAction, updateUsuarioAction } from '@/lib/actions/usuario'
import { RegistrarUsuarioData, registrarUsuarioSchema } from '@/lib/schemas/usuario'
import { Usuario } from '@/types/models'

export type CadastroUsuarioPageProps = {
  usuario?: Usuario
  onSuccess?: () => void
}

export function CadastroUsuario({ usuario, onSuccess }: CadastroUsuarioPageProps) {
  const { notify } = useContext(NotificationContext)
  const [isPending, startTransition] = useTransition()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegistrarUsuarioData>({
    resolver: zodResolver(registrarUsuarioSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    values: usuario ? {
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone || '',
      senha: '',
    } : undefined,
  })

  const cadastrar = (data: RegistrarUsuarioData) => {
    startTransition(async () => {
      try {
        const response = await registrarUsuarioAction(data)
        if (response.ok) {
          reset()
          notify({
            type: 'success',
            title: 'Sucesso',
            message: 'Usuário cadastrado com sucesso',
          })
          onSuccess?.()
        } else {
          notify({
            type: 'error',
            title: 'Erro',
            message: response.error || 'Erro ao cadastrar usuário',
          })
        }
      } catch (error) {
        notify({
          type: 'error',
          title: 'Erro',
          message: 'Erro ao cadastrar usuário',
        })
      }
    })
  }

  const atualizar = (data: RegistrarUsuarioData) => {
    if (!usuario) {
      return
    }

    startTransition(async () => {
      try {
        const response = await updateUsuarioAction(usuario.id, data)
        if (response.ok) {
          reset()
          notify({
            type: 'success',
            title: 'Sucesso',
            message: 'Usuário atualizado com sucesso',
          })
          onSuccess?.()
        } else {
          notify({
            type: 'error',
            title: 'Erro',
            message: response.error || 'Erro ao atualizar usuário',
          })
        }
      } catch (error) {
        notify({
          type: 'error',
          title: 'Erro',
          message: 'Erro ao atualizar usuário',
        })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(usuario ? atualizar : cadastrar)} className='flex flex-col gap-4 bg-white p-4 rounded shadow'>
      <h2 className='font-semibold'>{usuario ? 'Editar Usuário' : 'Novo Usuário'}</h2>

      <InputGroup>
        <Label htmlFor='nome'>Nome <span className='text-red-600'>*</span></Label>
        <Input {...register('nome')} type='text' id='nome' disabled={isPending} />

        {errors.nome
          && <Alert variant='field-error'>
            <AlertOctagon />
            <AlertDescription>{errors.nome?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor='email'>Email <span className='text-red-600'>*</span></Label>
        <Input {...register('email')} type='text' id='email' disabled={isPending} />

        {errors.email
          && <Alert variant='field-error'>
            <AlertOctagon />
            <AlertDescription>{errors.email?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      {!usuario && (
        <InputGroup>
          <Label htmlFor='senha'>Senha <span className='text-red-600'>*</span></Label>
          <Input {...register('senha')} type='password' id='senha' disabled={isPending} />

          {errors.senha
            && <Alert variant='field-error'>
              <AlertOctagon />
              <AlertDescription>{errors.senha?.message}</AlertDescription>
            </Alert>}
        </InputGroup>
      )}

      <InputGroup>
        <Label htmlFor='telefone'>Telefone</Label>
        <Input {...register('telefone')} type='tel' id='telefone' disabled={isPending} />

        {errors.telefone
          && <Alert variant='field-error'>
            <AlertOctagon />
            <AlertDescription>{errors.telefone?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      <Toolbar>
        {!usuario
          ? <Button type='submit' disabled={isPending} className='flex gap-2 items-center'><Save size={22} /> {isPending ? 'Criando...' : 'Criar'}</Button>
          : (
            <>
              <Button type='submit' disabled={isPending} className='flex gap-2 items-center'><Save size={22} /> {isPending ? 'Atualizando...' : 'Atualizar'}</Button>
              <Button type='button' onClick={() => { reset(); onSuccess?.() }} disabled={isPending} className='flex gap-2 items-center bg-red-700'><X size={22} /> Cancelar</Button>
            </>
          )
        }
      </Toolbar>
    </form>
  )
}
