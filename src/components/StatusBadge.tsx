import type { StatusChamado } from '../types'

const estilos: Record<StatusChamado, string> = {
  ABERTO: 'bg-brand-100 text-brand-700',
  EM_ANDAMENTO: 'bg-amber-100 text-amber-700',
  CONCLUIDO: 'bg-green-100 text-green-700',
}

const rotulos: Record<StatusChamado, string> = {
  ABERTO: 'Aberto',
  EM_ANDAMENTO: 'Em andamento',
  CONCLUIDO: 'Concluído',
}

export default function StatusBadge({ status }: { status: StatusChamado }) {
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${estilos[status]}`}
    >
      {rotulos[status]}
    </span>
  )
}