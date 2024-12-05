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
import { registerSchema } from '@/schemas/auth'
import type { RegisterFormType } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { FaFacebookF } from 'react-icons/fa'
import { GrGoogle } from 'react-icons/gr'

export function RegisterForm() {
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const { mutateAsync: createUser, isPending } = useCreateUser()

  return (
    <Form {...form}>
      <form
        noValidate
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(data => createUser(data))}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo*</FormLabel>
              <FormControl>
                <Input size={300} type="text" placeholder="Digite seu nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email*</FormLabel>

              <FormControl>
                <Input type="email" placeholder="Digite seu email" {...field} />
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
                <PasswordInput placeholder="Crie uma senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton isLoading={isPending} type="submit">
          Cadastre-se
        </LoadingButton>

        <div className="flex gap-2 items-center justify-center">
          <p className="text-sm">Já tem uma conta?</p>
          <Button variant="link" className="pl-0" asChild>
            <Link href="/auth/register">Entrar</Link>
          </Button>
        </div>
      </form>
    </Form>
  )
}
