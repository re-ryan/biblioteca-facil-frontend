import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { lookupBookByIsbn } from '../services/isbnApi'
import { IsbnLookupCard } from './IsbnLookupCard'

vi.mock('../services/isbnApi', async (importOriginal) => {
  const original = await importOriginal()
  return {
    ...original,
    lookupBookByIsbn: vi.fn(),
  }
})

const metadata = {
  isbn: '9788535902778',
  titulo: 'Livro consultado',
  editora: 'Editora Exemplo',
  descricao: 'Descrição externa.',
  anoPublicacao: 2026,
  urlImagemCapa: null,
}

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 60_000 },
    },
  })

const renderLookup = (queryClient = createQueryClient()) =>
  render(
    <QueryClientProvider client={queryClient}>
      <IsbnLookupCard />
    </QueryClientProvider>,
  )

const submitIsbn = async (user, isbn = '9788535902778') => {
  await user.type(screen.getByLabelText(/^isbn-13$/i), isbn)
  await user.click(screen.getByRole('button', { name: /consultar isbn/i }))
}

describe('IsbnLookupCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('exibe os metadados retornados pela consulta externa', async () => {
    const user = userEvent.setup()
    lookupBookByIsbn.mockResolvedValue(metadata)

    renderLookup()
    await submitIsbn(user)

    expect(await screen.findByRole('heading', { name: 'Livro consultado' })).toBeInTheDocument()
    expect(screen.getByText('Editora Exemplo · 2026')).toBeInTheDocument()
    expect(lookupBookByIsbn).toHaveBeenCalledWith(
      '9788535902778',
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    )
  })

  it('valida o ISBN antes de iniciar a consulta', async () => {
    const user = userEvent.setup()

    renderLookup()
    await submitIsbn(user, '123')

    expect(screen.getByText('Informe um ISBN-13 válido com 13 números.')).toBeInTheDocument()
    expect(lookupBookByIsbn).not.toHaveBeenCalled()
  })

  it('apresenta a falha devolvida pela consulta externa', async () => {
    const user = userEvent.setup()
    lookupBookByIsbn.mockRejectedValue(new Error('ISBN não encontrado.'))

    renderLookup()
    await submitIsbn(user)

    expect(await screen.findByRole('alert')).toHaveTextContent('ISBN não encontrado.')
  })

  it('reutiliza o resultado armazenado no cache por ISBN', async () => {
    const user = userEvent.setup()
    const queryClient = createQueryClient()
    lookupBookByIsbn.mockResolvedValue(metadata)

    const firstRender = renderLookup(queryClient)
    await submitIsbn(user)
    await screen.findByRole('heading', { name: 'Livro consultado' })
    firstRender.unmount()

    renderLookup(queryClient)
    await submitIsbn(user)
    await screen.findByRole('heading', { name: 'Livro consultado' })

    expect(lookupBookByIsbn).toHaveBeenCalledTimes(1)
  })
})
