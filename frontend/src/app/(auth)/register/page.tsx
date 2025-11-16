'use client'

import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { useState } from 'react'

export default function RegisterPage() {
  const { registerUsuario } = useAuth()
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', senha: '' })

  const onSubmit = () => {
    registerUsuario(form)
  }

  return (
    <form className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">Cadastrar</h1>

      <InputGroup>
        <InputGroupInput id="nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
        <InputGroupAddon align="block-start">
          <Label htmlFor="nome">Nome</Label>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput id="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <InputGroupAddon align="block-start">
          <Label htmlFor="email">E-mail</Label>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput id="telefone" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} />
        <InputGroupAddon align="block-start">
          <Label htmlFor="telefone">E-mail</Label>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput id="senha" type="password" value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} />
        <InputGroupAddon align="block-start">
          <Label htmlFor="senha">Senha</Label>
        </InputGroupAddon>
      </InputGroup>

      <Button type="button" onClick={onSubmit}>Cadastrar</Button>

      <p className="text-sm text-center">
        Já tem conta? <Link href="/login" className="text-blue-600">Entre</Link>
      </p>
    </form>
  )
}
