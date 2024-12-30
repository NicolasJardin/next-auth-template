import { z } from 'zod'

export const forgotPasswordConfirmationSchema = z.object({
  code: z.string().min(1, { message: 'Campo de preenchimento obrigatório.' })
})
