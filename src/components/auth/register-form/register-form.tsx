'use client'

import { LoadingButton } from '@/components/button'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Separator } from '@/components/ui/separator'
import { useCreateUser } from '@/mutations/users'
import { registerSchema } from '@/schemas/auth'
import type { RegisterFormType } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
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
              <FormControl>
                <Input type="text" placeholder="Nome completo" {...field} />
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
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
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
              <FormControl>
                <PasswordInput placeholder="Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton isLoading={isPending} type="submit">
          Cadastre-se
        </LoadingButton>

        <div className="flex gap-2 items-center justify-center">
          <Separator className="w-[45%]" />
          <p>ou</p>
          <Separator className="w-[45%]" />
        </div>
        <Button variant="outline" type="button">
          <GrGoogle className="mr-2 h-4 w-4" />
          Entrar com o Google
        </Button>
        <Button variant="outline" type="button">
          <FaFacebookF className="mr-2 h-4 w-4" />
          Entrar com o Facebook
        </Button>
      </form>
    </Form>
  )
}
