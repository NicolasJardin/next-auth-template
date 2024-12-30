'use client'

import { LoadingButton } from '@/components/button'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCreateUser } from '@/mutations/users'
import { forgotPasswordConfirmationSchema } from '@/schemas/auth'
import type { ForgotPasswordConfirmationFormType } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export function ForgotPasswordConfirmationForm() {
  const form = useForm<ForgotPasswordConfirmationFormType>({
    resolver: zodResolver(forgotPasswordConfirmationSchema),
    defaultValues: {
      code: ''
    }
  })

  //@TODO trocar mutation
  const { mutateAsync: confirmPassword, isPending } = useCreateUser()

  return (
    <Form {...form}>
      <form
        noValidate
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(data => confirmPassword(data as any))}
      >
        <fieldset className="flex flex-col gap-4">
          <legend className="sr-only">Campos de confirmação de código</legend>

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código de confirmação*</FormLabel>

                <FormControl>
                  <Input
                    size={300}
                    type="email"
                    placeholder="Digite o código que você recebeu. Exemplo: 000000"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <LoadingButton isLoading={isPending} type="submit">
          Confirmar
        </LoadingButton>

        <div className="mt-4 flex gap-2 items-center justify-center">
          <p className="text-sm">Não recebeu o código?</p>
          <Button variant="link" className="pl-0">
            Enviar novamente
          </Button>
        </div>
      </form>
    </Form>
  )
}
