import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import StatusBadge from '../components/StatusBadge'
import { ApiError } from '../services/api'
import { chamadoService } from '../services/chamadoService'
import type { Chamado } from '../types'

export default function DetalheChamado() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [chamado, setChamado] = useState<Chamado | null>(null)
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')
    const [apagando, setApagando] = useState(false)

    useEffect(() => {
        chamadoService
            .buscar(Number(id))
            .then(setChamado)
            .catch((e) =>
                setErro(e instanceof ApiError ? e.message : 'Erro inesperado.'),
            )
            .finally(() => setCarregando(false))
    }, [id])

    async function apagar() {
        if (!chamado) return
        if (!window.confirm('Apagar este chamado? Isso não pode ser desfeito.')) {
            return
        }

        setErro('')
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

            {carregando && <p className="text-slate-600">Carregando chamado...</p>}

            {erro && (
                <p role="alert" className="rounded bg-red-50 p-3 text-sm text-red-700">
                    {erro}
                </p>
            )}

            {chamado && (
                <article className="space-y-3 rounded-xl bg-white p-6 shadow">
                    <div className="flex items-start justify-between gap-3">
                        <h1 className="text-2xl font-bold text-slate-800">
                            {chamado.titulo}
                        </h1>
                        <StatusBadge status={chamado.status} />
                    </div>

                    <p className="text-slate-700">
                        {chamado.descricao ?? 'Sem descrição.'}
                    </p>

                    <p className="text-xs text-slate-500">
                        {chamado.usuario ? `${chamado.usuario.nome} · ` : ''}
                        Aberto em {new Date(chamado.criadoEm).toLocaleDateString('pt-BR')}
                    </p>

                    <div className="flex items-center gap-3 pt-2">
                        <Link
                            to={`/chamados/${chamado.id}/editar`}
                            className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            Editar
                        </Link>
                        <button
                            onClick={apagar}
                            disabled={apagando}
                            className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                        >
                            {apagando ? 'Apagando...' : 'Apagar'}
                        </button>
                    </div>
                </article>
            )}
        </section>
    )
}