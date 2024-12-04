import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { LoadingButton } from './loading-button'

describe('loading-button', () => {
  it('should render correctly when is not loading', async () => {
    render(<LoadingButton isLoading={false} />)

    expect(await screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
  it('should render correctly when is loading', () => {
    render(<LoadingButton isLoading={true} />)

    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
  it('should be disabled when is loading', () => {
    render(<LoadingButton isLoading={true} />)

    expect(screen.getByRole('button')).toBeDisabled()
  })
})
