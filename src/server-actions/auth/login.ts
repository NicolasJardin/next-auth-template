'use server'

import { loginSchema } from '@/schemas/auth'
import { createAuthService } from '@/services/auth'
import { cookies } from 'next/headers'
import { ZodError } from 'zod'
import { jwtDecode } from 'jwt-decode'
import type { DecodedTokenType } from '@/types/auth'

export type State =
  | {
      status: 'success'
      decodedToken: DecodedTokenType
    }
  | {
      status: 'error'
      message: string
      errors?: Array<{
        path: string
        message: string
      }>
    }
  | null

export async function login(prevState: State, formData: FormData): Promise<State> {
  const data = {
    email: formData.get('email'),
    password: formData.get('password')
  }

  try {
    const { email, password } = loginSchema.parse(data)

    const response = await createAuthService().login({
      email,
      password
    })

    const cookieStore = await cookies()

    cookieStore.set('token', response.access_token)

    return {
      status: 'success',
      decodedToken: jwtDecode<DecodedTokenType>(response.access_token)
    }
  } catch (e) {
    if (e instanceof ZodError) {
      return {
        status: 'error',
        message: 'Dados de formulário inválidos',
        errors: e.issues.map(issue => ({
          path: issue.path.join('.'),
          message: issue.message
        }))
      }
    }

    return {
      status: 'error',
      message: 'Por favor, tente novamente mais tarde.'
    }
  }
}
