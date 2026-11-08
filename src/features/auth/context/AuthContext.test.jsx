import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DEMO_CREDENTIALS, READER_DEMO_CREDENTIALS } from '../authentication'
import { AuthProvider } from './AuthProvider'
import { useAuth } from './useAuth'

describe('AuthContext', () => {
  it('autentica e encerra uma sessão em memória', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })

    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBeNull()

    let authenticatedUser = null
    act(() => {
      authenticatedUser = result.current.login(DEMO_CREDENTIALS)
    })

    expect(authenticatedUser).toMatchObject({ role: 'ADMINISTRADOR' })
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

    let authenticatedUser = { role: 'INVALIDO' }
    act(() => {
      authenticatedUser = result.current.login({
        login: DEMO_CREDENTIALS.login,
        password: 'senha-incorreta',
      })
    })

    expect(authenticatedUser).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('identifica o perfil do leitor', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })

    act(() => result.current.login(READER_DEMO_CREDENTIALS))

    expect(result.current.user).toMatchObject({
      login: READER_DEMO_CREDENTIALS.login,
      role: 'LEITOR',
    })
  })
})
