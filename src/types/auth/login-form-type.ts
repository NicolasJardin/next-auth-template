import { loginSchema } from '@/schemas/auth'
import { z } from 'zod'

export type LoginFormType = z.infer<typeof loginSchema>
