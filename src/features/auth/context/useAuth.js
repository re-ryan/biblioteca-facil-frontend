import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de AuthProvider.')
  }

  return context
}
