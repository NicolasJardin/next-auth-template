import { passwordRegex } from '@/constants'
import { z } from 'zod'

export const forgotPasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Campo de preenchimento obrigatório.' })
      .email({ message: 'Digite um e-mail válido.' }),
    password: z
      .string()
      .min(1, { message: 'Campo de preenchimento obrigatório.' })
      .regex(passwordRegex, {
        message:
          'Sua senha deve ter pelo menos 8 caracteres, incluindo ao menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (por exemplo: !, @, #, $).'
      }),
    confirmPassword: z.string().min(1, { message: 'Campo de preenchimento obrigatório.' })
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas devem ser iguais'
  })
