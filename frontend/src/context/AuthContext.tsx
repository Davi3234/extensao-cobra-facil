'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { decodeToken, generateToken, validateToken } from '@/lib/jwt'
import { UsuarioService } from '@/services/UsuarioService'
import { Usuario } from '@/types/models'
import { useRouter } from 'next/navigation'
import { createContext, useEffect } from 'react'

interface AuthContextType {
  usuario: Usuario | null
  login: (email: string, senha: string) => Promise<void>
  registerUsuario: (form: Omit<Usuario, 'id' | 'ativo'>) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>(null!)
const usuarioService = new UsuarioService()

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useLocalStorage('token')
  const [usuario, setUsuario] = useLocalStorage('usuario')
  const router = useRouter()

  const login = async (email: string, senha: string) => {
    const usuario = (await usuarioService.list()).find(usuario => usuario.email == email && usuario.senha == senha && usuario.ativo == 1)

    if (!usuario) {
      return alert('Usuário ou senha inválidos.')
    }

    const token = generateToken({ id: usuario.id })

    setToken(token)
    setUsuario(usuario)

    router.push('/dashboard')
  }

  const registerUsuario = (form: Omit<Usuario, 'id' | 'ativo'>) => {
    usuarioService.create(form)

    alert('Usuário cadastrado com sucesso!')

    router.push('/login')
  }

  const logout = () => {
    localStorage.clear()

    setUsuario(null)

    router.push('/login')
  }

  useEffect(() => {
    if (!token) {
      return logout()
    }

    if (!validateToken(token)) {
      return logout()
    }

    const decoded = decodeToken(token)

    usuarioService.find(decoded.id).then(usuario => {
      if (!usuario) {
        return logout()
      }

      setUsuario(usuario)
    })
  }, [token])

  return (
    <AuthContext.Provider value={{ usuario, login, registerUsuario, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
