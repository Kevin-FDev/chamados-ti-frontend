import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import Alert from '../components/Alert'
import Card from '../components/Card'
import StatusBadge from '../components/StatusBadge'
import { ApiError } from '../services/api'
import { chamadoService } from '../services/chamadoService'
import type { Chamado } from '../types'

const botaoNovo =
  'inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'

export default function Chamados() {
  const location = useLocation()
  const sucesso = (location.state as { sucesso?: string } | null)?.sucesso

  const [chamados, setChamados] = useState<Chamado[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    chamadoService
      .listar()
      .then(setChamados)
      .catch((e) =>
        setErro(e instanceof ApiError ? e.message : 'Erro inesperado.'),
      )
      .finally(() => setCarregando(false))
  }, [])

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-800">Chamados</h1>
        <Link to="/chamados/novo" className={botaoNovo}>
          Novo chamado
        </Link>
      </div>

      {sucesso && <Alert tipo="sucesso">{sucesso}</Alert>}
      {erro && <Alert tipo="erro">{erro}</Alert>}

      {carregando && (
        <div className="space-y-3" aria-busy="true">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-24 animate-pulse rounded-2xl bg-slate-200"
            />
          ))}
        </div>
      )}

      {!carregando && !erro && chamados.length === 0 && (
        <Card className="space-y-3 py-10 text-center">
          <p className="text-slate-600">Nenhum chamado por aqui ainda.</p>
          <div>
            <Link to="/chamados/novo" className={botaoNovo}>
              Abrir o primeiro chamado
            </Link>
          </div>
        </Card>
      )}

      <ul className="space-y-3">
        {chamados.map((c) => (
          <li key={c.id}>
            <Link
              to={`/chamados/${c.id}`}
              className="block rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md hover:ring-brand-500/40"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-semibold text-slate-800">{c.titulo}</h2>
                <StatusBadge status={c.status} />
              </div>
              {c.descricao && (
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                  {c.descricao}
                </p>
              )}
              <p className="mt-2 text-xs text-slate-500">
                {c.usuario ? `${c.usuario.nome} · ` : ''}
                {new Date(c.criadoEm).toLocaleDateString('pt-BR')}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}