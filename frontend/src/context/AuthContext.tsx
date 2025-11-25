'use client'

import { useRouter } from 'next/navigation'
import { createContext } from 'react'

import { useCurrentUsuario } from '@/hooks/useCurrentUsuario'
import { useNotification } from '@/hooks/useNotification'
import { loginAction, logoutAction, signUpAction } from '@/lib/actions/auth'
import { LoginUsuarioData, RegistrarUsuarioData } from '@/lib/schemas/usuario'
import { Usuario } from '@/types/models'

interface AuthContextType {
  usuario: Usuario | null
  login: (data: LoginUsuarioData) => Promise<void>
  registerUsuario: (form: RegistrarUsuarioData) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>(null!)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { usuario, refresh } = useCurrentUsuario()
  const router = useRouter()
  const { notify } = useNotification()

  const login = async (data: LoginUsuarioData) => {
    const response = await loginAction(data)

    if (response.ok) {
      refresh()
      router.push('/dashboard')
    } else {
      notify({ type: 'error', message: response.error || 'Erro ao efetuar o login' })
    }
  }

  const registerUsuario = async (form: RegistrarUsuarioData) => {
    const response = await signUpAction(form)

    if (response.ok) {
      router.push('/login')
    } else {
      notify({ type: 'error', message: response.error || 'Erro ao efetuar o cadastro do usuário' })
    }
  }

  const logout = async () => {
    const response = await logoutAction()

    if (response.ok) {
      router.push('/login')
    } else {
      notify({ type: 'error', message: response.error || 'Erro ao efetuar o logout' })
    }
  }

  return (
    <AuthContext.Provider value={{ usuario, login, registerUsuario, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
