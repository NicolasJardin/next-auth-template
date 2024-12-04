import { Button, ButtonProps } from '@/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'

type LoadingButtonProps = ButtonProps & {
  isLoading: boolean
}

export function LoadingButton(props: LoadingButtonProps) {
  const { disabled, isLoading, children, ...restProps } = props

  return (
    <Button disabled={isLoading || disabled} {...restProps}>
      {isLoading && <ReloadIcon role="img" className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}
