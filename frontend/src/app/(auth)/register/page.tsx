'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertOctagon } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { RegistrarUsuarioData, registrarUsuarioSchema } from '@/lib/schemas/usuario'

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrarUsuarioData>({
    resolver: zodResolver(registrarUsuarioSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const { registerUsuario } = useAuth()

  const onSubmit = (data: RegistrarUsuarioData) => {
    registerUsuario(data)
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-bold text-center">Cadastrar</h1>

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

      <InputGroup>
        <InputGroupInput {...register('telefone')} type="tel" id="telefone" />
        <InputGroupAddon align="block-start">
          <Label htmlFor="telefone">Telefone</Label>
        </InputGroupAddon>
      </InputGroup>

      <Button type="submit">Cadastrar</Button>

      <p className="text-sm text-center">
        Já tem conta? <Link href="/login" className="text-blue-600">Entre</Link>
      </p>
    </form>
  )
}
