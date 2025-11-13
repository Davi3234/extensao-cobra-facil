'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { useState } from 'react'

export default function RegisterPage() {
  const { registerUser } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })

  const onSubmit = () => {
    registerUser(form)
  }

  return (
    <form className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">Cadastrar</h1>

      <Input label="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input label="E-mail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <Input label="Telefone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <Input label="Senha" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <Button type="button" onClick={onSubmit}>Cadastrar</Button>

      <p className="text-sm text-center">
        Já tem conta? <Link href="/login" className="text-blue-600">Entre</Link>
      </p>
    </form>
  )
}
