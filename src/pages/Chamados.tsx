import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import StatusBadge from '../components/StatusBadge'
import { ApiError } from '../services/api'
import { chamadoService } from '../services/chamadoService'
import type { Chamado } from '../types'

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
                <Link
                    to="/chamados/novo"
                    className="rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                    Novo chamado
                </Link>
            </div>

            {sucesso && (
                <p role="status" className="rounded bg-green-50 p-3 text-sm text-green-700">
                    {sucesso}
                </p>
            )}

            {carregando && <p className="text-slate-600">Carregando chamados...</p>}

            {erro && (
                <p role="alert" className="rounded bg-red-50 p-3 text-sm text-red-700">
                    {erro}
                </p>
            )}

            {!carregando && !erro && chamados.length === 0 && (
                <p className="rounded bg-white p-6 text-center text-slate-600 shadow">
                    Nenhum chamado por aqui ainda.
                </p>
            )}

            <ul className="space-y-3">
                {chamados.map((c) => (
                    <li key={c.id} className="rounded-xl bg-white p-4 shadow">
                        <div className="flex items-start justify-between gap-3">
                            <h2 className="font-semibold text-slate-800">
                                <Link to={`/chamados/${c.id}`} className="hover:underline">
                                    {c.titulo}
                                </Link>
                            </h2>
                            <StatusBadge status={c.status} />
                        </div>
                        {c.descricao && (
                            <p className="mt-1 text-sm text-slate-600">{c.descricao}</p>
                        )}
                        <p className="mt-2 text-xs text-slate-500">
                            {c.usuario ? `${c.usuario.nome} · ` : ''}
                            {new Date(c.criadoEm).toLocaleDateString('pt-BR')}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    )
}