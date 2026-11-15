import { useEffect, useState, type ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import { authService } from '../services/authService'
import type { Usuario } from '../types'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    authService
      .me()
      .then(setUsuario)
      .catch(() => setUsuario(null))
      .finally(() => setCarregando(false))
  }, [])

  async function entrar(email: string, senha: string) {
    await authService.login(email, senha)
    setUsuario(await authService.me())
  }

  async function sair() {
    await authService.logout()
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, carregando, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  )
}