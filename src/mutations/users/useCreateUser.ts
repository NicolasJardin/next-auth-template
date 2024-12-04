import { useToast } from '@/hooks/use-toast'
import type { BaseError } from '@/services/base/types'
import { createUsersService } from '@/services/users'
import type { CreateUserRequest, CreateUserResponse } from '@/services/users/types'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function useCreateUser(
  options?: UseMutationOptions<CreateUserResponse, BaseError, CreateUserRequest>
) {
  const mutationKey = ['users', 'create']

  const mutationFn = async (variables: CreateUserRequest) =>
    await createUsersService().createUser(variables)

  const { toast } = useToast()

  const { push } = useRouter()

  return useMutation({
    mutationKey,
    mutationFn,
    ...options,
    onSuccess(data, variables, context) {
      options?.onSuccess?.(data, variables, context)

      toast({
        title: 'Conta criada com sucesso!',
        description: 'Bem-vindo! Agora você pode fazer login e começar a usar sua conta.'
      })

      push('./login')
    },
    onError(error, variables, context) {
      options?.onError?.(error, variables, context)

      if (error.message === 'This user already exists')
        return toast({
          variant: 'destructive',
          title: 'E-mail já cadastrado!',
          description: 'Esse e-mail já está em uso. Tente fazer login ou use outro e-mail.'
        })

      toast({
        variant: 'destructive',
        title: 'Ops, ocorreu um erro!',
        description: 'Por favor, tente novamente mais tarde.'
      })
    }
  })
}
