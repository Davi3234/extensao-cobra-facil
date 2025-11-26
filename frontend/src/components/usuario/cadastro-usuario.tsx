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
import { RequiredSymbol } from '@/components/ui/required-symbol'
import { Toolbar } from '@/components/ui/toolbar'
import { NotificationContext } from '@/context/NotificationContext'
import { registrarUsuarioAction, updateUsuarioAction } from '@/lib/actions/usuario'
import { atualizarUsuarioSchema, RegistrarUsuarioData, registrarUsuarioSchema } from '@/lib/schemas/usuario'
import { Usuario } from '@/types/models'

export type CadastroUsuarioPageProps = {
  usuario?: Usuario
  onSuccess?: () => void
  disabled?: boolean
}

export function CadastroUsuario({ usuario, onSuccess, disabled }: CadastroUsuarioPageProps) {
  const { notify } = useContext(NotificationContext)
  const [isPending, startTransition] = useTransition()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegistrarUsuarioData>({
    resolver: zodResolver(usuario ? atualizarUsuarioSchema : registrarUsuarioSchema as any),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    values: {
      nome: usuario?.nome || '',
      email: usuario?.email || '',
      telefone: usuario?.telefone || '',
      senha: usuario?.senha || '',
    },
  })

  const cadastrar = (data: RegistrarUsuarioData) => {
    startTransition(async () => {
      try {
        const response = await registrarUsuarioAction(data)

        if (response.ok) {
          reset()
          notify({ type: 'success', message: 'Usuário cadastrado com sucesso' })
          onSuccess?.()
        } else {
          notify({ type: 'error', message: response.error || 'Erro ao cadastrar usuário' })
        }
      } catch (error) {
        notify({ type: 'error', message: 'Erro ao cadastrar usuário' })
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
          notify({ type: 'success', message: 'Usuário atualizado com sucesso' })
          onSuccess?.()
        } else {
          notify({ type: 'error', message: response.error || 'Erro ao atualizar usuário' })
        }
      } catch (error) {
        notify({ type: 'error', message: 'Erro ao atualizar usuário' })
      }
    })
  }

  const disabledForm = isPending || disabled

  return (
    <form onSubmit={handleSubmit(usuario ? atualizar : cadastrar)} className='flex flex-col gap-4 bg-white p-4 rounded shadow'>
      <h2 className='font-semibold'>{usuario ? 'Editar Usuário' : 'Novo Usuário'}</h2>

      <InputGroup>
        <Label htmlFor='nome'>Nome <RequiredSymbol /></Label>
        <Input {...register('nome')} type='text' id='nome' disabled={disabledForm} />

        {errors.nome
          && <Alert variant='field-error'>
            <AlertOctagon />
            <AlertDescription>{errors.nome?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor='email'>Email <RequiredSymbol /></Label>
        <Input {...register('email')} type='text' id='email' disabled={disabledForm} />

        {errors.email
          && <Alert variant='field-error'>
            <AlertOctagon />
            <AlertDescription>{errors.email?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      {!usuario && (
        <InputGroup>
          <Label htmlFor='senha'>Senha <RequiredSymbol /></Label>
          <Input {...register('senha')} type='password' id='senha' disabled={disabledForm} />

          {errors.senha
            && <Alert variant='field-error'>
              <AlertOctagon />
              <AlertDescription>{errors.senha?.message}</AlertDescription>
            </Alert>}
        </InputGroup>
      )}

      <InputGroup>
        <Label htmlFor='telefone'>Telefone</Label>
        <Input {...register('telefone')} type='tel' id='telefone' disabled={disabledForm} />

        {errors.telefone
          && <Alert variant='field-error'>
            <AlertOctagon />
            <AlertDescription>{errors.telefone?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      <Toolbar>
        {!usuario
          ? <Button type='submit' disabled={disabledForm} className='flex gap-2 items-center'><Save size={22} /> {isPending ? 'Criando...' : 'Criar'}</Button>
          : (
            <>
              <Button type='submit' disabled={disabledForm} className='flex gap-2 items-center'><Save size={22} /> {isPending ? 'Atualizando...' : 'Atualizar'}</Button>
              <Button type='button' variant={'destructive'} onClick={() => { reset(); onSuccess?.() }} disabled={disabledForm} className='flex gap-2 items-center'><X size={22} /> Cancelar</Button>
            </>
          )
        }
      </Toolbar>
    </form>
  )
}
