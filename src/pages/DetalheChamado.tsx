import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import Alert from '../components/Alert'
import Button from '../components/Button'
import Card from '../components/Card'
import StatusBadge from '../components/StatusBadge'
import { useAuth } from '../contexts/AuthContext'
import { ApiError } from '../services/api'
import { chamadoService } from '../services/chamadoService'
import type { Chamado, StatusChamado } from '../types'

const botaoEditar =
  'inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'

export default function DetalheChamado() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { usuario } = useAuth()

  const [chamado, setChamado] = useState<Chamado | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [aviso, setAviso] = useState('')
  const [apagando, setApagando] = useState(false)
  const [salvandoStatus, setSalvandoStatus] = useState(false)

  useEffect(() => {
    chamadoService
      .buscar(Number(id))
      .then(setChamado)
      .catch((e) =>
        setErro(e instanceof ApiError ? e.message : 'Erro inesperado.'),
      )
      .finally(() => setCarregando(false))
  }, [id])

  async function mudarStatus(novo: StatusChamado) {
    if (!chamado) return

    setErro('')
    setAviso('')
    setSalvandoStatus(true)

    try {
      const atualizado = await chamadoService.mudarStatus(chamado.id, novo)
      setChamado({ ...chamado, status: atualizado.status })
      setAviso('Status atualizado!')
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : 'Erro inesperado.')
    } finally {
      setSalvandoStatus(false)
    }
  }

  async function apagar() {
    if (!chamado) return
    if (!window.confirm('Apagar este chamado? Isso não pode ser desfeito.')) {
      return
    }

    setErro('')
    setAviso('')
    setApagando(true)

    try {
      await chamadoService.apagar(chamado.id)
      navigate('/', { state: { sucesso: 'Chamado apagado.' } })
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : 'Erro inesperado.')
      setApagando(false)
    }
  }

  return (
    <section className="space-y-4">
      <Link to="/" className="text-sm text-slate-600 hover:underline">
        ← Voltar para a lista
      </Link>

      {aviso && <Alert tipo="sucesso">{aviso}</Alert>}
      {erro && <Alert tipo="erro">{erro}</Alert>}

      {carregando && (
        <div
          className="h-48 animate-pulse rounded-2xl bg-slate-200"
          aria-busy="true"
        />
      )}

      {chamado && (
        <Card className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl font-bold text-slate-800">
              {chamado.titulo}
            </h1>
            <StatusBadge status={chamado.status} />
          </div>

          <p className="whitespace-pre-line text-slate-700">
            {chamado.descricao ?? 'Sem descrição.'}
          </p>

          <p className="text-xs text-slate-500">
            {chamado.usuario ? `${chamado.usuario.nome} · ` : ''}
            Aberto em {new Date(chamado.criadoEm).toLocaleDateString('pt-BR')}
          </p>

          {usuario?.papel === 'ADMIN' && (
            <label className="block text-sm font-medium text-slate-700">
              Status (somente administrador)
              <select
                value={chamado.status}
                onChange={(e) => mudarStatus(e.target.value as StatusChamado)}
                disabled={salvandoStatus}
                className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 disabled:opacity-60 sm:w-64"
              >
                <option value="ABERTO">Aberto</option>
                <option value="EM_ANDAMENTO">Em andamento</option>
                <option value="CONCLUIDO">Concluído</option>
              </select>
            </label>
          )}

          <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
            <Link to={`/chamados/${chamado.id}/editar`} className={botaoEditar}>
              Editar
            </Link>
            <Button variante="perigo" onClick={apagar} disabled={apagando}>
              {apagando ? 'Apagando...' : 'Apagar'}
            </Button>
          </div>
        </Card>
      )}
    </section>
  )
}