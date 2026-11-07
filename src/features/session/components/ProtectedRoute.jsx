import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSession } from '../context/sessionContext'

export const ProtectedRoute = () => {
  const location = useLocation()
  const { isAuthenticated } = useSession()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
