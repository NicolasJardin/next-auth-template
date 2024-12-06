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
import { useToast } from '@/hooks/use-toast'
import { loginSchema } from '@/schemas/auth'
import { login, State } from '@/server-actions/auth/login'
import type { LoginFormType } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { FieldPath, useForm } from 'react-hook-form'

export function LoginForm() {
  const [state, formAction] = useFormState<State, FormData>(login, null)

  const { toast } = useToast()

  const { push } = useRouter()

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { setError, clearErrors } = form

  useEffect(() => {
    if (!state) {
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
          <Link href="/auth/register">Esqueceu a senha?</Link>
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
