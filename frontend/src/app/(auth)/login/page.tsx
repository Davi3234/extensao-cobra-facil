'use client'

import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { useAuth } from '@/hooks/useAuth'
import { Label } from '@radix-ui/react-label'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const { usuario, login } = useAuth()
  const [form, setForm] = useState({ email: '', senha: '' })

  const onSubmit = () => {
    login(form.email, form.senha)
  }

  useEffect(() => {
    if (usuario) {
      redirect('/dashboard')
    }
  }, [])

  return (
    <form className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">Login</h1>

      <InputGroup>
        <InputGroupInput id="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <InputGroupAddon align="block-start">
          <Label htmlFor="email">E-mail</Label>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput id="senha" type="password" value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} />
        <InputGroupAddon align="block-start">
          <Label htmlFor="senha">Senha</Label>
        </InputGroupAddon>
      </InputGroup>

      <Button type="button" onClick={onSubmit}>Entrar</Button>

      <p className="text-sm text-center">
        Não tem conta? <Link href="/register" className="text-blue-600">Cadastre-se</Link>
      </p>
    </form>
  )
}
