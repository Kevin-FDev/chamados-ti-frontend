import { createContext, useContext } from 'react'
import type { Usuario } from '../types'

export type AuthContextValue = {
  usuario: Usuario | null
  carregando: boolean
  entrar: (email: string, senha: string) => Promise<void>
  sair: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  const contexto = useContext(AuthContext)
  if (!contexto) {
    throw new Error('useAuth precisa estar dentro do AuthProvider')
  }
  return contexto
}