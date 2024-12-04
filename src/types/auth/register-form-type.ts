import { registerSchema } from '@/schemas/auth'
import { z } from 'zod'

export type RegisterFormType = z.infer<typeof registerSchema>
