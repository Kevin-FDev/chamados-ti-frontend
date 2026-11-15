import { api } from './api'
import type { Chamado, StatusChamado } from '../types'

export type DadosChamado = { titulo: string; descricao?: string }

export const chamadoService = {
  listar() {
    return api<Chamado[]>('/chamados')
  },

  buscar(id: number) {
    return api<Chamado>(`/chamados/${id}`)
  },

  criar(dados: DadosChamado) {
    return api<Chamado>('/chamados', {
      method: 'POST',
      body: JSON.stringify(dados),
    })
  },

  editar(id: number, dados: DadosChamado) {
    return api<Chamado>(`/chamados/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(dados),
    })
  },

  mudarStatus(id: number, status: StatusChamado) {
    return api<Chamado>(`/chamados/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    })
  },

  apagar(id: number) {
    return api<null>(`/chamados/${id}`, { method: 'DELETE' })
  },
}