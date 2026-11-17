import { useState, type SyntheticEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import Alert from '../components/Alert'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import { ApiError } from '../services/api'
import { usuarioService } from '../services/usuarioService'

export default function Cadastro() {
  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function enviar(evento: SyntheticEvent) {
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
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand-600">Criar conta</h1>
          <p className="mt-1 text-sm text-slate-500">
            Cadastre-se para abrir chamados de TI
          </p>
        </div>

        <Card>
          <form onSubmit={enviar} className="space-y-4">
            {erro && <Alert tipo="erro">{erro}</Alert>}

            <Input
              rotulo="Nome"
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <Input
              rotulo="E-mail"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              rotulo="Senha (mínimo 6 caracteres)"
              type="password"
              required
              minLength={6}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <Button type="submit" disabled={enviando} className="w-full">
              {enviando ? 'Criando...' : 'Criar conta'}
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-slate-600">
          Já tem conta?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  )
}