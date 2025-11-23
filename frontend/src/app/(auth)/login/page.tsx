'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { AlertOctagon } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { LoginUsuarioData, loginUsuarioSchema } from '@/lib/schemas/usuario'

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginUsuarioData>({
    resolver: zodResolver(loginUsuarioSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const onSubmit = (data: LoginUsuarioData) => {
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-bold text-center">Login</h1>

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

      <Button type="submit">Entrar</Button>

      <p className="text-sm text-center">
        Não tem conta? <Link href="/register" className="text-blue-600">Cadastre-se</Link>
      </p>
    </form>
  )
}
