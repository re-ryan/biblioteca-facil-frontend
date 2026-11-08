import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { searchCatalog } from '../features/catalog/services/catalogApi'
import { getLibraryDetails } from '../features/catalog/services/libraryApi'
import { CatalogPage } from './CatalogPage'

vi.mock('../features/catalog/services/catalogApi', () => ({
  searchCatalog: vi.fn(),
}))

vi.mock('../features/catalog/services/libraryApi', () => ({
  getLibraryDetails: vi.fn(),
}))

const catalogBooks = [
  {
    id: 1,
    titulo: 'Dom Casmurro',
    isbn13: '9788535902778',
    editora: 'Companhia das Letras',
    anoPublicacao: 1998,
    urlImagemCapa: null,
    autores: ['Machado de Assis'],
    categorias: ['Romance'],
    bibliotecas: [
      { id: 1, nome: 'Biblioteca Central', quantidadeDisponivel: 2 },
      { id: 2, nome: 'Biblioteca do Bairro', quantidadeDisponivel: 0 },
    ],
  },
]

const renderCatalog = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <CatalogPage />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('CatalogPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    searchCatalog.mockResolvedValue(catalogBooks)
    getLibraryDetails.mockResolvedValue({
      id: 1,
      nome: 'Biblioteca Central',
      telefone: '(21) 3000-1000',
      email: 'central@biblioteca.local',
      endereco: {
        cep: '20010020',
        logradouro: 'Avenida dos Livros',
        numero: '100',
        complemento: null,
        bairro: 'Centro',
        cidade: 'Rio de Janeiro',
        uf: 'RJ',
      },
    })
  })

  it('exibe livros, bibliotecas e estoque retornados pela API', async () => {
    renderCatalog()

    expect(await screen.findByRole('heading', { name: /dom casmurro/i })).toBeInTheDocument()
    expect(screen.getByText('Machado de Assis')).toBeInTheDocument()
    expect(screen.getByText('Biblioteca Central')).toBeInTheDocument()
    expect(screen.getByText('2 disponíveis')).toBeInTheDocument()
    expect(screen.getByText('Biblioteca do Bairro')).toBeInTheDocument()
    expect(screen.getByText('Indisponível')).toBeInTheDocument()
  })

  it('envia os três filtros informados pelo leitor', async () => {
    const user = userEvent.setup()
    renderCatalog()

    await screen.findByRole('heading', { name: /dom casmurro/i })
    await user.type(screen.getByLabelText(/título/i), 'Dom')
    await user.type(screen.getByLabelText(/autor/i), 'Machado')
    await user.type(screen.getByLabelText(/categoria/i), 'Romance')
    await user.click(screen.getByRole('button', { name: /buscar livros/i }))

    await waitFor(() => {
      expect(searchCatalog).toHaveBeenLastCalledWith(
        { titulo: 'Dom', autor: 'Machado', categoria: 'Romance' },
        expect.any(AbortSignal),
      )
    })
  })

  it('abre os dados da biblioteca sem sair do catálogo', async () => {
    const user = userEvent.setup()
    renderCatalog()

    await screen.findByRole('heading', { name: /dom casmurro/i })
    await user.click(screen.getAllByRole('button', { name: /ver dados/i })[0])

    const dialog = await screen.findByRole('dialog', { name: /biblioteca central/i })
    expect(within(dialog).getByText('(21) 3000-1000')).toBeInTheDocument()
    expect(within(dialog).getByText('central@biblioteca.local')).toBeInTheDocument()
    expect(within(dialog).getByText(/avenida dos livros, 100/i)).toBeInTheDocument()
    expect(getLibraryDetails).toHaveBeenCalledWith(1, expect.any(AbortSignal))

    await user.click(within(dialog).getByRole('button', { name: /^fechar$/i }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(screen.getByRole('heading', { name: /dom casmurro/i })).toBeInTheDocument()
  })
})
