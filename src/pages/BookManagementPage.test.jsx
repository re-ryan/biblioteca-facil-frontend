import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { BookManagementPage } from './BookManagementPage'

describe('BookManagementPage', () => {
  it('cadastra, edita, pesquisa e oculta um livro localmente', async () => {
    const user = userEvent.setup()

    render(<BookManagementPage />)

    expect(screen.getByText('4 livros')).toBeInTheDocument()

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

    render(<BookManagementPage />)
    await user.click(screen.getByRole('button', { name: /cadastrar livro/i }))
    const dialog = screen.getByRole('dialog', { name: /cadastrar livro/i })
    await user.click(within(dialog).getByRole('button', { name: /cadastrar livro/i }))

    expect(within(dialog).getByText(/informe o título do livro/i)).toBeInTheDocument()
    expect(within(dialog).getByText(/informe o isbn-10 ou o isbn-13/i)).toBeInTheDocument()
  })
})
