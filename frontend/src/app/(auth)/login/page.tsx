'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertOctagon } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputGroup } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { LoginUsuarioData, loginUsuarioSchema } from '@/lib/schemas/usuario'

export default function LoginPage() {
  const { usuario, login } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginUsuarioData>({
    resolver: zodResolver(loginUsuarioSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  })

  const onSubmit = (data: LoginUsuarioData) => {
    login(data)
  }

  useEffect(() => {
    if (usuario) {
      redirect('/dashboard')
    }
  })

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-bold text-center">Login</h1>

      <InputGroup>
        <Label htmlFor="email">Email <span className='text-red-600'>*</span></Label>
        <Input {...register('email')} type="text" id="email" />

        {errors.email
          && <Alert variant="field-error">
            <AlertOctagon />
            <AlertDescription>{errors.email?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="senha">Senha <span className='text-red-600'>*</span></Label>
        <Input {...register('senha')} type="password" id="senha" />

        {errors.senha
          && <Alert variant="field-error">
            <AlertOctagon />
            <AlertDescription>{errors.senha?.message}</AlertDescription>
          </Alert>}
      </InputGroup>


      <Button type="submit">Entrar</Button>

      <p className="text-sm text-center">
        Não tem conta? <Link href="/sign-up" className="text-blue-600">Cadastre-se</Link>
      </p>
    </form>
  )
}
