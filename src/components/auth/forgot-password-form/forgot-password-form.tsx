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
import { PasswordInput } from '@/components/ui/password-input'
import { Separator } from '@/components/ui/separator'
import { useCreateUser } from '@/mutations/users'
import { forgotPasswordSchema } from '@/schemas/auth'
import type { ForgotPasswordFormType } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  //@TODO trocar mutation
  const { mutateAsync: recoveryPassword, isPending } = useCreateUser()

  return (
    <Form {...form}>
      <form
        noValidate
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(data => recoveryPassword(data as any))}
      >
        <fieldset className="flex flex-col gap-4">
          <legend className="sr-only">Campos de recuperação de senha</legend>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email*</FormLabel>

                <FormControl>
                  <Input size={300} type="email" placeholder="Digite seu email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha*</FormLabel>

                <FormControl>
                  <PasswordInput placeholder="Crie uma nova senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme sua senha*</FormLabel>

                <FormControl>
                  <PasswordInput placeholder="Repita a sua nova senha para confirmar" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <LoadingButton isLoading={isPending} type="submit">
          Continuar
        </LoadingButton>

        <div
          className="flex gap-2 items-center justify-center mt-4"
          aria-label="Separador entre métodos de registro"
        >
          <Separator className="w-[45%]" />
          <p className="font-medium text-gray-500 text-sm">OU</p>
          <Separator className="w-[45%]" />
        </div>

        <Button variant="link" className="" asChild>
          <Link href="/auth/register">Criar uma nova conta</Link>
        </Button>

        <Button variant="outline" className="" asChild>
          <Link href="/auth/login">Voltar para o login</Link>
        </Button>
      </form>
    </Form>
  )
}
