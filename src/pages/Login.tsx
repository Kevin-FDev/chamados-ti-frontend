import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import { ApiError } from '../services/api'

export default function Login() {
  const { entrar } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const sucesso = (location.state as { sucesso?: string } | null)?.sucesso

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function enviar(evento: FormEvent) {
    evento.preventDefault()
    setErro('')
    setEnviando(true)

    try {
      await entrar(email, senha)
      navigate('/')
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : 'Erro inesperado.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <form
        onSubmit={enviar}
        className="w-full max-w-sm space-y-4 rounded-xl bg-white p-6 shadow"
      >
        <h1 className="text-2xl font-bold text-slate-800">Entrar</h1>

        {sucesso && (
          <p role="status" className="rounded bg-green-50 p-3 text-sm text-green-700">
            {sucesso}
          </p>
        )}

        {erro && (
          <p role="alert" className="rounded bg-red-50 p-3 text-sm text-red-700">
            {erro}
          </p>
        )}

        <label className="block text-sm font-medium text-slate-700">
          E-mail
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded border border-slate-300 p-2"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Senha
          <input
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="mt-1 w-full rounded border border-slate-300 p-2"
          />
        </label>

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded bg-blue-600 p-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>

        <p className="text-center text-sm text-slate-600">
          Não tem conta?{' '}
          <Link to="/cadastro" className="font-semibold text-blue-600 hover:underline">
            Criar conta
          </Link>
        </p>
      </form>
    </main>
  )
}