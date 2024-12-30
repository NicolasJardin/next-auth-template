'use client'

import { SubmitButton } from '@/components/button/submit-button'
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
import { useLoginForm } from '@/hooks/auth'
import { loginSchema } from '@/schemas/auth'
import { login, State } from '@/server-actions/auth/login'
import type { LoginFormType } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'

export function LoginForm() {
  const [state, formAction] = useFormState<State, FormData>(login, null)

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  useLoginForm(state, form)

  return (
    <Form {...form}>
      <form action={formAction} noValidate className="flex flex-col gap-4">
        <fieldset className="flex flex-col gap-4">
          <legend className="sr-only">Campos de login</legend>
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
                  <PasswordInput placeholder="Digite sua senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <Button variant="link" className="pl-0 w-fit" asChild>
          <Link href="/auth/forgot-password">Esqueceu a senha?</Link>
        </Button>
        <SubmitButton>Entrar</SubmitButton>

        <div className="mt-4 flex gap-2 items-center justify-center">
          <p className="text-sm">Não tem uma conta?</p>
          <Button variant="link" className="pl-0" asChild>
            <Link href="/auth/register">Cadastre-se</Link>
          </Button>
        </div>
      </form>
    </Form>
  )
}
