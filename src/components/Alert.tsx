import type { ReactNode } from 'react'

type Tipo = 'erro' | 'sucesso' | 'aviso'

const estilos: Record<Tipo, string> = {
  erro: 'border-red-200 bg-red-50 text-red-700',
  sucesso: 'border-green-200 bg-green-50 text-green-700',
  aviso: 'border-amber-200 bg-amber-50 text-amber-700',
}

type Props = { tipo: Tipo; children: ReactNode }

export default function Alert({ tipo, children }: Props) {
  return (
    <p
      role={tipo === 'erro' ? 'alert' : 'status'}
      className={`rounded-lg border p-3 text-sm ${estilos[tipo]}`}
    >
      {children}
    </p>
  )
}