import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import ChamadoForm from '../components/ChamadoForm'
import { ApiError } from '../services/api'
import { chamadoService, type DadosChamado } from '../services/chamadoService'
import type { Chamado } from '../types'

export default function EditarChamado() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [chamado, setChamado] = useState<Chamado | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    chamadoService
      .buscar(Number(id))
      .then(setChamado)
      .catch((e) =>
        setErro(e instanceof ApiError ? e.message : 'Erro inesperado.'),
      )
      .finally(() => setCarregando(false))
  }, [id])

  async function salvar(dados: DadosChamado) {
    await chamadoService.editar(Number(id), dados)
    navigate('/', { state: { sucesso: 'Chamado atualizado!' } })
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-800">Editar chamado</h1>

      {carregando && <p className="text-slate-600">Carregando chamado...</p>}

      {erro && (
        <p role="alert" className="rounded bg-red-50 p-3 text-sm text-red-700">
          {erro}
        </p>
      )}

      {chamado && (
        <ChamadoForm
          inicial={{
            titulo: chamado.titulo,
            descricao: chamado.descricao ?? '',
          }}
          textoBotao="Salvar alterações"
          textoEnviando="Salvando..."
          onEnviar={salvar}
        />
      )}
    </section>
  )
}