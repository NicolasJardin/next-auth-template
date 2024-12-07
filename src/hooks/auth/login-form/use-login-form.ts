import { useToast } from '@/hooks/use-toast'
import { State } from '@/server-actions/auth/login'
import { LoginFormType } from '@/types/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FieldPath, UseFormReturn } from 'react-hook-form'

export function useLoginForm(state: State, form: UseFormReturn<LoginFormType>) {
  const { toast } = useToast()

  const { push } = useRouter()

  const { clearErrors, setError } = form

  useEffect(() => {
    if (!state?.status) {
      return
    }

    clearErrors()

    if (state.status === 'error') {
      toast({
        variant: 'destructive',
        title: 'Ops, ocorreu um erro!',
        description: state.message
      })

      state.errors?.forEach(error => {
        setError(error.path as FieldPath<LoginFormType>, {
          message: error.message
        })
      })
    }

    if (state.status === 'success') {
      toast({
        title: 'Login realizado com sucesso!',
        description: 'Você foi autenticado com sucesso e agora pode acessar sua conta.'
      })

      push('/onboarding')
    }
  }, [state, setError, clearErrors, toast, push])

  return null
}
