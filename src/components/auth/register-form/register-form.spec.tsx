import { useCreateUser } from '@/mutations/users'
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { RegisterForm } from './register-form'

jest.mock('@/mutations/users', () => ({
  useCreateUser: jest.fn()
}))

describe('register-form', () => {
  const mockCreateUser = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
    ;(useCreateUser as jest.Mock).mockReturnValue({
      mutateAsync: mockCreateUser,
      isPending: false
    })
  })

  it('renderiza corretamente os campos do formulário', () => {
    render(<RegisterForm />)

    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cadastre-se/i })).toBeInTheDocument()
  })

  it('mostra erros de validação ao enviar formulário vazio', async () => {
    render(<RegisterForm />)

    fireEvent.click(screen.getByRole('button', { name: /cadastre-se/i }))

    await waitFor(() => {
      const errors = screen.getAllByText('Campo de preenchimento obrigatório.')

      expect(errors).toHaveLength(3)
      expect(errors[0]).toBeInTheDocument()
      expect(errors[1]).toBeInTheDocument()
      expect(errors[2]).toBeInTheDocument()
    })
  })

  it('envia o formulário corretamente quando os dados são válidos', async () => {
    render(<RegisterForm />)

    fireEvent.input(screen.getByLabelText(/nome completo/i), {
      target: { value: 'John Doe' }
    })
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'johndoe@example.com' }
    })
    fireEvent.input(screen.getByLabelText(/senha/i), {
      target: { value: 'Password@123' }
    })

    fireEvent.click(screen.getByRole('button', { name: /cadastre-se/i }))

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledTimes(1)
      expect(mockCreateUser).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'Password@123'
      })
    })
  })

  it('desabilita botão enquanto o formulário está pendente', () => {
    ;(useCreateUser as jest.Mock).mockReturnValue({
      mutateAsync: mockCreateUser,
      isPending: true
    })

    render(<RegisterForm />)

    expect(screen.getByRole('button', { name: /cadastre-se/i })).toHaveAttribute('disabled')
  })
})
