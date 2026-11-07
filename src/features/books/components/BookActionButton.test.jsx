import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { BookActionButton } from './BookActionButton'

describe('BookActionButton', () => {
  it('repassa as propriedades restantes ao botão', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <BookActionButton color="error" aria-label="Ocultar livro" onClick={handleClick}>
        Ocultar
      </BookActionButton>,
    )

    const button = screen.getByRole('button', { name: /ocultar livro/i })
    await user.click(button)

    expect(button).toHaveAttribute('type', 'button')
    expect(handleClick).toHaveBeenCalledOnce()
  })
})
