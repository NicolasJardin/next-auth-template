import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Campo de preenchimento obrigatório.' })
    .email({ message: 'Digite um e-mail válido.' }),
  password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres.')
})
