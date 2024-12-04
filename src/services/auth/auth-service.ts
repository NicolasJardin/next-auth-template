import { fetchWrapper } from '../base'
import type { LoginRequest, LoginResponse } from './types'

const endpoint = 'auth'

async function login(body: LoginRequest) {
  const response = await fetchWrapper<LoginResponse>(`${endpoint}/login`, {
    method: 'POST',
    body
  })

  return response
}

export function createAuthService() {
  return { login }
}
