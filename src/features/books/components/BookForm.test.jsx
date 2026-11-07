import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { BookForm } from './BookForm'

const emptyValues = {
  titulo: '',
  isbn10: '',
  isbn13: '',
  editora: '',
  anoPublicacao: '',
  edicao: '',
  descricao: '',
  urlImagemCapa: '',
}

const renderForm = (props = {}) =>
  render(
    <BookForm
      values={emptyValues}
      errors={{}}
      submitLabel="Cadastrar livro"
      controlled={false}
      onChange={vi.fn()}
      onFieldChange={vi.fn()}
      onSubmit={(event) => event.preventDefault()}
      onCancel={vi.fn()}
      loading={false}
      {...props}
    />,
  )

describe('BookForm', () => {
  it('lê os campos não controlados no cadastro', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const onFieldChange = vi.fn()
    let submittedValues

    renderForm({
      onChange,
      onFieldChange,
      onSubmit: (event) => {
        event.preventDefault()
        submittedValues = Object.fromEntries(new FormData(event.currentTarget).entries())
      },
    })

    await user.type(screen.getByLabelText(/^título/i), 'Livro não controlado')
    await user.type(screen.getByLabelText(/isbn-13/i), '9788532508126')
    await user.click(screen.getByRole('button', { name: /cadastrar livro/i }))

    expect(submittedValues.titulo).toBe('Livro não controlado')
    expect(submittedValues.isbn13).toBe('9788532508126')
    expect(onChange).not.toHaveBeenCalled()
    expect(onFieldChange).toHaveBeenCalledWith('titulo')
  })

  it('envia as alterações dos campos controlados na edição', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    renderForm({
      values: { ...emptyValues, titulo: 'Livro existente' },
      submitLabel: 'Salvar alterações',
      controlled: true,
      onChange,
    })

    const titleField = screen.getByLabelText(/^título/i)
    expect(titleField).toHaveValue('Livro existente')

    await user.type(titleField, 'X')
    expect(onChange).toHaveBeenCalledWith('titulo', 'Livro existenteX')
  })
})
