import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { ApiError } from '../services/api'
import type { DadosChamado } from '../services/chamadoService'

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
    <form onSubmit={enviar} className="space-y-4 rounded-xl bg-white p-6 shadow">
      {erro && (
        <p role="alert" className="rounded bg-red-50 p-3 text-sm text-red-700">
          {erro}
        </p>
      )}

      <label className="block text-sm font-medium text-slate-700">
        Título (3 a 100 caracteres)
        <input
          type="text"
          required
          minLength={3}
          maxLength={100}
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="mt-1 w-full rounded border border-slate-300 p-2"
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Descrição (opcional, até 250 caracteres)
        <textarea
          rows={4}
          maxLength={250}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="mt-1 w-full rounded border border-slate-300 p-2"
        />
        <span className="text-xs text-slate-500">{descricao.length}/250</span>
      </label>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={enviando}
          className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {enviando ? textoEnviando : textoBotao}
        </button>
        <Link to="/" className="text-sm text-slate-600 hover:underline">
          Cancelar
        </Link>
      </div>
    </form>
  )
}