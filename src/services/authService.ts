import { api } from './api'
import type { Usuario } from '../types'

export const authService = {
  login(email: string, senha: string) {
    return api<{ accessToken: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    })
  },

  logout() {
    return api<{ message: string }>('/auth/logout', { method: 'POST' })
  },

  me() {
    return api<Usuario>('/auth/me')
  },
}