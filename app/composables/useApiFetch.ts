import type { UseFetchOptions } from 'nuxt/app'

export function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig()
  const headers = new Headers(options.headers as HeadersInit | undefined)

  headers.set('Accept', 'application/json')
  if (config.public.appBase) headers.set('Referer', config.public.appBase)

  const method = String(options.method ?? 'GET').toUpperCase()
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    const csrfToken = useCookie('XSRF-TOKEN')
    if (csrfToken.value) headers.set('X-XSRF-TOKEN', csrfToken.value)
  }

  return useFetch<T>(path, {
    baseURL: config.public.apiBase,
    credentials: 'include',
    ...options,
    headers,
  })
}
