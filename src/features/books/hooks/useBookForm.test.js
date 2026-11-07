import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useBookForm } from './useBookForm'

const book = {
  id: 1,
  titulo: 'Domain-Driven Design',
  isbn10: '',
  isbn13: '9780321125217',
  editora: 'Addison-Wesley',
  anoPublicacao: 2003,
  edicao: '1',
  descricao: '',
  urlImagemCapa: '',
}

describe('useBookForm', () => {
  it('controla os modos de cadastro e edição', () => {
    const { result } = renderHook(() => useBookForm())

    act(() => result.current.openEdit(book))
    expect(result.current.isOpen).toBe(true)
    expect(result.current.isEditing).toBe(true)
    expect(result.current.values.titulo).toBe('Domain-Driven Design')

    act(() => result.current.changeField('titulo', 'Domain-Driven Design revisado'))
    expect(result.current.values.titulo).toBe('Domain-Driven Design revisado')

    act(() => result.current.close())
    expect(result.current.isOpen).toBe(false)
    expect(result.current.isEditing).toBe(true)

    act(() => result.current.openCreate())
    expect(result.current.isEditing).toBe(false)
    expect(result.current.values.titulo).toBe('')
  })

  it('valida os dados do formulário', () => {
    const { result } = renderHook(() => useBookForm())

    act(() => result.current.openCreate())
    let valid
    act(() => {
      valid = result.current.validate()
    })

    expect(valid).toBe(false)
    expect(result.current.errors.titulo).toBe('Informe o título do livro.')
    expect(result.current.errors.isbn).toBe('Informe o ISBN-10 ou o ISBN-13.')
  })
})
