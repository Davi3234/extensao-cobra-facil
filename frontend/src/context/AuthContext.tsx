'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useRouter } from 'next/navigation'
import { createContext, useEffect } from 'react'

import { loginAction, signUpAction } from '@/lib/actions/auth'
import { LoginUsuarioData, RegistrarUsuarioData } from '@/lib/schemas/usuario'
import { Usuario } from '@/types/models'
import { useNotification } from '../hooks/useNotification'

interface AuthContextType {
  usuario: Usuario | null
  login: (data: LoginUsuarioData) => Promise<void>
  registerUsuario: (form: RegistrarUsuarioData) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>(null!)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useLocalStorage('token')
  const [usuario, setUsuario] = useLocalStorage('usuario')
  const router = useRouter()
  const { notify } = useNotification()

  const login = async (data: LoginUsuarioData) => {
    const response = await loginAction(data)

    if (response.ok) {
      router.push('/dashboard')
    }
    else {
      notify({
        message: response.error || 'Erro ao efetuar login',
        type: 'error'
      })
    }
  }

  const registerUsuario = async (form: RegistrarUsuarioData) => {
    await signUpAction(form).then(() => {
      router.push('/login')
    })
  }

  const logout = () => {
    setUsuario(null)

    router.push('/login')
  }

  useEffect(() => {
    if (!token) {
      return logout()
    }
  }, [token])

  return (
    <AuthContext.Provider value={{ usuario, login, registerUsuario, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
