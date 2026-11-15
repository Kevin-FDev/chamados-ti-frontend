import { Route, Routes } from 'react-router'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Cadastro from './pages/Cadastro'
import Chamados from './pages/Chamados'
import DetalheChamado from './pages/DetalheChamado'
import Login from './pages/Login'
import NovoChamado from './pages/NovoChamado'
import EditarChamado from './pages/EditarChamado'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Chamados />} />
          <Route path="/chamados/novo" element={<NovoChamado />} />
          <Route path="/chamados/:id" element={<DetalheChamado />} />
          <Route path="/chamados/:id/editar" element={<EditarChamado />} />
        </Route>
      </Route>
    </Routes>
  )
}