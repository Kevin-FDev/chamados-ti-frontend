import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { ApiError } from '../services/api'
import { usuarioService } from '../services/usuarioService'

export default function Cadastro() {
  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function enviar(evento: FormEvent) {
    evento.preventDefault()
    setErro('')
    setEnviando(true)

    try {
      await usuarioService.cadastrar(nome, email, senha)
      navigate('/login', {
        state: { sucesso: 'Conta criada! Faça login para continuar.' },
      })
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
        <h1 className="text-2xl font-bold text-slate-800">Criar conta</h1>

        {erro && (
          <p role="alert" className="rounded bg-red-50 p-3 text-sm text-red-700">
            {erro}
          </p>
        )}

        <label className="block text-sm font-medium text-slate-700">
          Nome
          <input
            type="text"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="mt-1 w-full rounded border border-slate-300 p-2"
          />
        </label>

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
          Senha (mínimo 6 caracteres)
          <input
            type="password"
            required
            minLength={6}
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
          {enviando ? 'Criando...' : 'Criar conta'}
        </button>

        <p className="text-center text-sm text-slate-600">
          Já tem conta?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline">
            Entrar
          </Link>
        </p>
      </form>
    </main>
  )
}