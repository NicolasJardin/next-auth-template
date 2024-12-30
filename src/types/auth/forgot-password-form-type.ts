import { forgotPasswordSchema } from '@/schemas/auth'
import { z } from 'zod'

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>
