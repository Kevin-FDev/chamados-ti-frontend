import { api } from './api'

export const usuarioService = {
  cadastrar(nome: string, email: string, senha: string) {
    return api<unknown>('/usuarios', {
      method: 'POST',
      body: JSON.stringify({ nome, email, senha }),
    })
  },
}