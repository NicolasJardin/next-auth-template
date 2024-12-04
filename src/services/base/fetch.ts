export async function fetchWrapper<T = unknown>(
  input: string | URL | globalThis.Request,
  init?: Omit<RequestInit, 'body'> & {
    body: object
  }
): Promise<T> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${input}`, {
    ...init,
    body: init?.body ? JSON.stringify(init.body) : undefined,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    const error = await response.json().catch(() => response.text())
    throw error
  }

  const result = await response.json()

  return result
}
