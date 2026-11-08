import { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { authenticate, DEMO_USER } from '../authentication'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = useCallback((credentials) => {
    if (!authenticate(credentials)) {
      return false
    }

    setUser(DEMO_USER)
    return true
  }, [])

  const logout = useCallback(() => setUser(null), [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
