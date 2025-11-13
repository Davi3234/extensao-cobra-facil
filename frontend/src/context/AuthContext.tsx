'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { decodeToken, generateToken, validateToken } from '@/lib/jwt'
import { UserService } from '@/services/userService'
import { User } from '@/types/models'
import { useRouter } from 'next/navigation'
import { createContext, useEffect } from 'react'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => void
  registerUser: (form: Omit<User, 'id'>) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>(null!)
const userService = new UserService()

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useLocalStorage('token')
  const [user, setUser] = useLocalStorage('user')
  const router = useRouter()

  const login = (email: string, password: string) => {
    const user = userService.list().find((x) => x.email == email && x.password == password)

    if (!user) {
      return alert('Usuário ou senha inválidos.')
    }

    const token = generateToken({ id: user.id })

    setToken(token)
    setUser(user)

    // router.push('/dashboard')
  }

  const registerUser = (form: Omit<User, 'id'>) => {
    userService.create(form)

    alert('Usuário cadastrado com sucesso!')

    // router.push('/login')
  }

  const logout = () => {
    localStorage.clear()

    setUser(null)

    // router.push('/login')
  }

  useEffect(() => {
    if (!token) {
      return logout()
    }

    if (!validateToken(token)) {
      return logout()
    }

    const decoded = decodeToken(token)

    const currentUser = userService.find(decoded.id)

    if (!currentUser) {
      return logout()
    }

    setUser(currentUser)
  }, [token])

  return (
    <AuthContext.Provider value={{ user, login, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
