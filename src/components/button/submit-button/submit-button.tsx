'use client'

import { ButtonProps } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import { LoadingButton } from '../loading-button'

type SubmitButtonProps = ButtonProps

export function SubmitButton(props: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return <LoadingButton type="submit" isLoading={pending} {...props} />
}
