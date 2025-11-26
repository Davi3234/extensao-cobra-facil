'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertOctagon } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputGroup } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { RequiredSymbol } from '@/components/ui/required-symbol'
import { useAuth } from '@/hooks/useAuth'
import { RegistrarUsuarioData, registrarUsuarioSchema } from '@/lib/schemas/usuario'

export default function RegisterPage() {
  const { registerUsuario } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrarUsuarioData>({
    resolver: zodResolver(registrarUsuarioSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  })

  const onSubmit = (data: RegistrarUsuarioData) => {
    registerUsuario(data)
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-bold text-center">Cadastrar</h1>

      <InputGroup>
        <Label htmlFor="nome">Nome <RequiredSymbol /></Label>
        <Input {...register('nome')} type="text" id="nome" />

        {errors.nome
          && <Alert variant="field-error">
            <AlertOctagon />
            <AlertDescription>{errors.nome?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="email">Email <RequiredSymbol /></Label>
        <Input {...register('email')} type="text" id="email" />

        {errors.email
          && <Alert variant="field-error">
            <AlertOctagon />
            <AlertDescription>{errors.email?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="senha">Senha <RequiredSymbol /></Label>
        <Input {...register('senha')} type="password" id="senha" />

        {errors.senha
          && <Alert variant="field-error">
            <AlertOctagon />
            <AlertDescription>{errors.senha?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="telefone">Telefone</Label>
        <Input {...register('telefone')} type="tel" id="telefone" />

        {errors.telefone
          && <Alert variant="field-error">
            <AlertOctagon />
            <AlertDescription>{errors.telefone?.message}</AlertDescription>
          </Alert>}
      </InputGroup>

      <Button type="submit">Cadastrar</Button>

      <p className="text-sm text-center">
        Já tem conta? <Link href="/login" className="text-blue-600">Entre</Link>
      </p>
    </form>
  )
}
