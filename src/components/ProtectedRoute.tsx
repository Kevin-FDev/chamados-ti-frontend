import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute() {
  const { usuario, carregando } = useAuth()

  if (carregando) return <p className="p-6">Carregando...</p>
  if (!usuario) return <Navigate to="/login" replace />

  return <Outlet />
}