import type { ComponentProps } from 'react'

type Props = ComponentProps<'input'> & { rotulo: string }

export default function Input({ rotulo, className = '', ...resto }: Props) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {rotulo}
      <input
        className={`mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 ${className}`}
        {...resto}
      />
    </label>
  )
}