import { fetchWrapper } from '../base'
import type { LoginRequest, LoginResponse } from './types'

export const endpoint = 'auth'

export function createAuthService() {
  async function login(body: LoginRequest) {
    const response = await fetchWrapper<LoginResponse>(`${endpoint}/login`, {
      method: 'POST',
      body
    })

    return response
  }

  return { login }
}
