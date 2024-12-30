import { forgotPasswordConfirmationSchema } from '@/schemas/auth'
import { z } from 'zod'

export type ForgotPasswordConfirmationFormType = z.infer<typeof forgotPasswordConfirmationSchema>
