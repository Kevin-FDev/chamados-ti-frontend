import { useNavigate } from 'react-router'
import ChamadoForm from '../components/ChamadoForm'
import { chamadoService, type DadosChamado } from '../services/chamadoService'

export default function NovoChamado() {
  const navigate = useNavigate()

  async function criar(dados: DadosChamado) {
    await chamadoService.criar(dados)
    navigate('/', { state: { sucesso: 'Chamado criado com sucesso!' } })
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-800">Novo chamado</h1>
      <ChamadoForm
        textoBotao="Abrir chamado"
        textoEnviando="Enviando..."
        onEnviar={criar}
      />
    </section>
  )
}