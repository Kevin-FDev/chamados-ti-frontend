import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { ApiError } from '../services/api'
import type { DadosChamado } from '../services/chamadoService'
import Alert from './Alert'
import Button from './Button'
import Card from './Card'
import Input from './Input'

type Props = {
  inicial?: DadosChamado
  textoBotao: string
  textoEnviando: string
  onEnviar: (dados: DadosChamado) => Promise<void>
}

export default function ChamadoForm({
  inicial,
  textoBotao,
  textoEnviando,
  onEnviar,
}: Props) {
  const [titulo, setTitulo] = useState(inicial?.titulo ?? '')
  const [descricao, setDescricao] = useState(inicial?.descricao ?? '')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function enviar(evento: FormEvent) {
    evento.preventDefault()
    setErro('')
    setEnviando(true)

    try {
      await onEnviar({
        titulo: titulo.trim(),
        descricao: descricao.trim() || undefined,
      })
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : 'Erro inesperado.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <Card>
      <form onSubmit={enviar} className="space-y-4">
        {erro && <Alert tipo="erro">{erro}</Alert>}

        <Input
          rotulo="Título (3 a 100 caracteres)"
          type="text"
          required
          minLength={3}
          maxLength={100}
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <label className="block text-sm font-medium text-slate-700">
          Descrição (opcional, até 250 caracteres)
          <textarea
            rows={4}
            maxLength={250}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
          <span className="text-xs text-slate-500">{descricao.length}/250</span>
        </label>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={enviando}>
            {enviando ? textoEnviando : textoBotao}
          </Button>
          <Link to="/" className="text-sm text-slate-600 hover:underline">
            Cancelar
          </Link>
        </div>
      </form>
    </Card>
  )
}