import { Link, Outlet } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import Button from './Button'

export default function Layout() {
  const { usuario, sair } = useAuth()

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="text-lg font-bold text-brand-600">
            Chamados de TI
          </Link>

          <div className="flex items-center gap-3">
            <div className="max-w-32 text-right text-sm leading-tight sm:max-w-48">
              <p className="truncate font-medium text-slate-800">
                {usuario?.nome}
              </p>
              <p className="text-xs text-slate-500">
                {usuario?.papel === 'ADMIN' ? 'Administrador' : 'Usuário'}
              </p>
            </div>
            <Button variante="secundario" onClick={sair}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}