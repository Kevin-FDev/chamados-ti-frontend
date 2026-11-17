import type { ComponentProps } from 'react'

export default function Card({ className = '', ...resto }: ComponentProps<'div'>) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 ${className}`}
      {...resto}
    />
  )
}