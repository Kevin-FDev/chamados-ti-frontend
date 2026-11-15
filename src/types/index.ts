export type Papel = 'ADMIN' | 'USER'

export type StatusChamado = 'ABERTO' | 'EM_ANDAMENTO' | 'CONCLUIDO'

export type Usuario = {
  nome: string
  email: string
  papel: Papel
}

export type Chamado = {
  id: number
  titulo: string
  descricao: string | null
  status: StatusChamado
  criadoEm: string
  usuarioId: number
  usuario?: { nome: string; email: string }
}