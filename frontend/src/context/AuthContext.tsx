'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useRouter } from 'next/navigation'
import { createContext } from 'react'

import { useNotification } from '@/hooks/useNotification'
import { loginAction, signUpAction } from '@/lib/actions/auth'
import { LoginUsuarioData, RegistrarUsuarioData } from '@/lib/schemas/usuario'
import { Usuario } from '@/types/models'

interface AuthContextType {
  usuario: Usuario | null
  login: (data: LoginUsuarioData) => Promise<void>
  registerUsuario: (form: RegistrarUsuarioData) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>(null!)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useLocalStorage('usuario')
  const router = useRouter()
  const { notify } = useNotification()

  const login = async (data: LoginUsuarioData) => {
    const response = await loginAction(data)

    if (response.ok) {
      router.push('/dashboard')
    } else {
      notify({
        message: response.error || 'Erro ao efetuar login',
        type: 'error'
      })
    }
  }

  const registerUsuario = async (form: RegistrarUsuarioData) => {
    const response = await signUpAction(form)

    if (response.ok) {
      router.push('/login')
    } else {
      notify({
        message: response.error || 'Erro ao efetuar logout',
        type: 'error'
      })
    }
  }

  const logout = () => {
    setUsuario(null)

    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ usuario, login, registerUsuario, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
