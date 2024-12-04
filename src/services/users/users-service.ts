import { fetchWrapper } from '../base'
import type { CreateUserRequest, CreateUserResponse } from './types'

const endpoint = 'users'

async function createUser(body: CreateUserRequest) {
  const response = await fetchWrapper<CreateUserResponse>(`${endpoint}`, {
    method: 'POST',
    body
  })

  return response
}

export function createUsersService() {
  return { createUser }
}
