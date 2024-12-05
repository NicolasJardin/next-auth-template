import { fetchWrapper } from '../base'
import type { CreateUserRequest, CreateUserResponse } from './types'

export const endpoint = 'users'

export function createUsersService() {
  async function createUser(body: CreateUserRequest) {
    const response = await fetchWrapper<CreateUserResponse>(`${endpoint}`, {
      method: 'POST',
      body
    })

    return response
  }

  return { createUser }
}
