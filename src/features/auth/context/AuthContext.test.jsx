import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DEMO_CREDENTIALS } from '../authentication'
import { AuthProvider } from './AuthProvider'
import { useAuth } from './useAuth'

describe('AuthContext', () => {
  it('autentica e encerra uma sessão em memória', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })

    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBeNull()

    let authenticated = false
    act(() => {
      authenticated = result.current.login(DEMO_CREDENTIALS)
    })

    expect(authenticated).toBe(true)
    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.user).toMatchObject({
      login: DEMO_CREDENTIALS.login,
      role: 'ADMINISTRADOR',
    })

    act(() => result.current.logout())

    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBeNull()
  })

  it('rejeita credenciais inválidas', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })

    let authenticated = true
    act(() => {
      authenticated = result.current.login({
        login: DEMO_CREDENTIALS.login,
        password: 'senha-incorreta',
      })
    })

    expect(authenticated).toBe(false)
    expect(result.current.isAuthenticated).toBe(false)
  })
})
