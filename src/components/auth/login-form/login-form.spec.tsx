import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { LoginForm } from './login-form'

describe('login-form', () => {
  it('Should render correctly', () => {
    render(<LoginForm />)

    expect(screen.getByText('Entrar')).toBeInTheDocument()
    expect(screen.getByText('Esqueceu a senha?')).toBeInTheDocument()
  })
})
