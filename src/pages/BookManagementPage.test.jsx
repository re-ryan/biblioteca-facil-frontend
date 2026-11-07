import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { BooksProvider } from '../features/books/context/BooksProvider'
import {
  createBook,
  hideBook,
  listBooks,
  updateBook,
} from '../features/books/services/bookApi'
import { BookManagementPage } from './BookManagementPage'

vi.mock('../features/books/services/bookApi', () => ({
  listBooks: vi.fn(),
  createBook: vi.fn(),
  updateBook: vi.fn(),
  hideBook: vi.fn(),
}))

const books = [
  {
    id: 1,
    titulo: 'Domain-Driven Design',
    isbn10: '',
    isbn13: '9780321125217',
    editora: 'Addison-Wesley',
    anoPublicacao: 2003,
    edicao: '1',
    descricao: '',
    urlImagemCapa: '',
    ativo: true,
  },
  {
    id: 2,
    titulo: 'Clean Architecture',
    isbn10: '',
    isbn13: '9780134494166',
    editora: 'Prentice Hall',
    anoPublicacao: 2017,
    edicao: '1',
    descricao: '',
    urlImagemCapa: '',
    ativo: true,
  },
  {
    id: 3,
    titulo: 'Refactoring',
    isbn10: '',
    isbn13: '9780134757599',
    editora: 'Addison-Wesley',
    anoPublicacao: 2018,
    edicao: '2',
    descricao: '',
    urlImagemCapa: '',
    ativo: true,
  },
  {
    id: 4,
    titulo: 'Implementing Domain-Driven Design',
    isbn10: '',
    isbn13: '9780321834577',
    editora: 'Addison-Wesley',
    anoPublicacao: 2013,
    edicao: '1',
    descricao: '',
    urlImagemCapa: '',
    ativo: true,
  },
]

const bookFromForm = (id, formValues) => ({
  id,
  ...formValues,
  anoPublicacao: formValues.anoPublicacao ? Number(formValues.anoPublicacao) : null,
  ativo: true,
})

const renderPage = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <BooksProvider>
        <BookManagementPage />
      </BooksProvider>
    </QueryClientProvider>,
  )
}

describe('BookManagementPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    listBooks.mockResolvedValue(books)
    createBook.mockImplementation((formValues) =>
      Promise.resolve(bookFromForm(5, formValues)),
    )
    updateBook.mockImplementation((bookId, formValues) =>
      Promise.resolve(bookFromForm(bookId, formValues)),
    )
    hideBook.mockResolvedValue(null)
  })

  it('cadastra, edita, pesquisa e oculta um livro pela API', async () => {
    const user = userEvent.setup()

    renderPage()

    expect(await screen.findByText('4 livros')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /cadastrar livro/i }))
    const createDialog = screen.getByRole('dialog', { name: /cadastrar livro/i })
    await user.type(within(createDialog).getByLabelText(/^título/i), 'Livro de teste')
    await user.type(within(createDialog).getByLabelText(/isbn-13/i), '9788532508126')
    await user.type(within(createDialog).getByLabelText(/editora/i), 'Editora Exemplo')
    await user.click(within(createDialog).getByRole('button', { name: /cadastrar livro/i }))
    await waitForElementToBeRemoved(createDialog)

    expect(screen.getByRole('heading', { name: 'Livro de teste' })).toBeInTheDocument()
    expect(screen.getByText('5 livros')).toBeInTheDocument()

    const createdCard = screen.getByRole('heading', { name: 'Livro de teste' }).closest('.MuiCard-root')
    await user.click(within(createdCard).getByRole('button', { name: /editar/i }))

    const editDialog = screen.getByRole('dialog', { name: /editar livro/i })
    const titleField = within(editDialog).getByLabelText(/^título/i)
    await user.clear(titleField)
    await user.type(titleField, 'Livro de teste revisado')
    await user.click(within(editDialog).getByRole('button', { name: /salvar alterações/i }))
    await waitForElementToBeRemoved(editDialog)

    expect(screen.getByRole('heading', { name: 'Livro de teste revisado' })).toBeInTheDocument()

    await user.type(screen.getByLabelText(/título do livro/i), 'revisado')
    await user.click(screen.getByRole('button', { name: /pesquisar/i }))
    expect(screen.getByText('1 livro')).toBeInTheDocument()

    const editedCard = screen
      .getByRole('heading', { name: 'Livro de teste revisado' })
      .closest('.MuiCard-root')
    await user.click(within(editedCard).getByRole('button', { name: /ocultar/i }))
    expect(screen.getByRole('dialog', { name: /ocultar livro da lista/i })).toHaveTextContent(
      /continuará preservado como registro inativo/i,
    )
    await user.click(screen.getByRole('button', { name: /ocultar livro/i }))
    await waitForElementToBeRemoved(
      screen.getByRole('dialog', { name: /ocultar livro da lista/i, hidden: true }),
    )

    expect(screen.queryByRole('heading', { name: 'Livro de teste revisado' })).not.toBeInTheDocument()
  })

  it('valida os campos obrigatórios antes do cadastro', async () => {
    const user = userEvent.setup()

    renderPage()
    await screen.findByText('4 livros')
    await user.click(screen.getByRole('button', { name: /cadastrar livro/i }))
    const dialog = screen.getByRole('dialog', { name: /cadastrar livro/i })
    await user.click(within(dialog).getByRole('button', { name: /cadastrar livro/i }))

    expect(within(dialog).getByText(/informe o título do livro/i)).toBeInTheDocument()
    expect(within(dialog).getByText(/informe o isbn-10 ou o isbn-13/i)).toBeInTheDocument()
  })

  it('mantém o modo de edição durante a animação de fechamento', async () => {
    const user = userEvent.setup()

    renderPage()
    await screen.findByText('4 livros')
    await user.click(screen.getAllByRole('button', { name: /editar/i })[0])

    const dialog = screen.getByRole('dialog', { name: /editar livro/i })
    await user.click(within(dialog).getByRole('button', { name: /cancelar/i }))

    expect(within(dialog).getByRole('button', { name: /salvar alterações/i })).toBeInTheDocument()
    await waitForElementToBeRemoved(dialog)
  })

  it('exibe a falha de carregamento e permite tentar novamente', async () => {
    listBooks.mockRejectedValueOnce(new Error('API de livros indisponível.'))

    renderPage()

    expect(await screen.findByText('API de livros indisponível.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /tentar novamente/i })).toBeInTheDocument()
  })
})
