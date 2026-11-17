import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router'
import Alert from '../components/Alert'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import { useAuth } from '../contexts/AuthContext'
import { ApiError } from '../services/api'

export default function Login() {
  const { entrar } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const sucesso = (location.state as { sucesso?: string } | null)?.sucesso
  const expirada = params.get('expirada') === '1'

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
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand-600">Chamados de TI</h1>
          <p className="mt-1 text-sm text-slate-500">
            Entre para abrir e acompanhar seus chamados
          </p>
        </div>

        <Card>
          <form onSubmit={enviar} className="space-y-4">
            {expirada && <Alert tipo="aviso">Sua sessão expirou. Entre novamente.</Alert>}
            {sucesso && <Alert tipo="sucesso">{sucesso}</Alert>}
            {erro && <Alert tipo="erro">{erro}</Alert>}

            <Input
              rotulo="E-mail"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              rotulo="Senha"
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <Button type="submit" disabled={enviando} className="w-full">
              {enviando ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-slate-600">
          Não tem conta?{' '}
          <Link to="/cadastro" className="font-semibold text-brand-600 hover:underline">
            Criar conta
          </Link>
        </p>
      </div>
    </main>
  )
}