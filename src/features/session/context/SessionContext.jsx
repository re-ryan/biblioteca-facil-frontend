import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { SessionContext } from './sessionContext'

const SESSION_STORAGE_KEY = 'biblioteca-facil:session'
const DEMO_LIBRARY_ID = 1

const readStoredSession = () => {
  try {
    const storedSession = window.sessionStorage.getItem(SESSION_STORAGE_KEY)
    return storedSession ? JSON.parse(storedSession) : null
  } catch {
    return null
  }
}

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(readStoredSession)

  const startLibrarySession = () => {
    const nextSession = {
      profile: 'LIBRARY',
      libraryId: DEMO_LIBRARY_ID,
    }

    window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(nextSession))
    setSession(nextSession)
  }

  const endSession = () => {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY)
    setSession(null)
  }

  const contextValue = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      startLibrarySession,
      endSession,
    }),
    [session],
  )

  return <SessionContext.Provider value={contextValue}>{children}</SessionContext.Provider>
}

SessionProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
