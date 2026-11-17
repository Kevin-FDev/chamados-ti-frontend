import type { ComponentProps } from 'react'

type Variante = 'primario' | 'secundario' | 'perigo'

const estilos: Record<Variante, string> = {
  primario: 'bg-brand-600 text-white hover:bg-brand-700',
  secundario:
    'bg-white text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50',
  perigo: 'bg-red-600 text-white hover:bg-red-700',
}

type Props = ComponentProps<'button'> & { variante?: Variante }

export default function Button({
  variante = 'primario',
  className = '',
  ...resto
}: Props) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${estilos[variante]} ${className}`}
      {...resto}
    />
  )
}