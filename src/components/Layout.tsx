import { Link, Outlet } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

export default function Layout() {
  const { usuario, sair } = useAuth()

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 p-4">
          <Link to="/" className="text-lg font-bold text-slate-800">
            Chamados de TI
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-600">
              {usuario?.nome} ({usuario?.papel})
            </span>
            <button
              onClick={sair}
              className="rounded bg-slate-800 px-3 py-1 text-white hover:bg-slate-700"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl p-4">
        <Outlet />
      </main>
    </div>
  )
}