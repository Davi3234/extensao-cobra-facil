'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const { user, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = () => {
    login(email, password)
  }

  useEffect(() => {
    if (user) {
      redirect('/dashboard')
    }
  }, [])

  return (
    <form className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">Login</h1>

      <Input label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <Button type="button" onClick={onSubmit}>Entrar</Button>

      <p className="text-sm text-center">
        Não tem conta? <Link href="/register" className="text-blue-600">Cadastre-se</Link>
      </p>
    </form>
  )
}
