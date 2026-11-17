const API_URL = import.meta.env.VITE_API_URL

const ROTAS_SEM_REDIRECT = ['/auth/login', '/auth/me']

export class ApiError extends Error {
  status: number

  constructor(mensagem: string, status: number) {
    super(mensagem)
    this.name = 'ApiError'
    this.status = status
  }
}

type ErroDoNest = { message?: string | string[] }

function lerJson(texto: string): unknown {
  if (!texto) return null
  try {
    return JSON.parse(texto)
  } catch {
    return null
  }
}

export async function api<T>(
  caminho: string,
  opcoes: RequestInit = {},
): Promise<T> {
  let resposta: Response

  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      ...opcoes,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...opcoes.headers },
    })
  } catch {
    throw new ApiError('Não foi possível conectar ao servidor.', 0)
  }

  const dados = lerJson(await resposta.text())

  if (!resposta.ok) {
    if (resposta.status === 401 && !ROTAS_SEM_REDIRECT.includes(caminho)) {
      window.location.assign('/login?expirada=1')
    }

    const { message } = (dados ?? {}) as ErroDoNest
    const texto = Array.isArray(message) ? message.join(' ') : message
    throw new ApiError(texto ?? 'Algo deu errado. Tente de novo.', resposta.status)
  }

  return dados as T
}