import type { UseFetchOptions } from '#app'

export function useApiFetch<T>(path: string | (() => string), options: UseFetchOptions<T> = {}) {
	let headers: any = {
		// https://laravel.com/docs/10.x/sanctum#spa-authentication
		accept: 'application/json',
		referer: 'http://localhost:3000',// Hace que laravel detecte es es un EnsureFrontendRequestsAreStateful
	}

	const token = useCookie('XSRF-TOKEN'); // Esto es equivalente a getCookie en Axios, lo pide documentación Laravel Sanctum 
	if (token.value) {
		headers['X-XSRF-TOKEN'] = token.value
	}
	
	// Para evitar el error 405 que aparece en un momento.
	if (process.server) {
		headers = {
			...headers,
			...useRequestHeaders(['cookie'])
		}
	}


	return useFetch('http://localhost'+path, {
		credentials: 'include',// Esto es equivalente a withCredentials en Axios, ver docu Laravel Sanctum, persiste cookie me parece
		watch: false, // Sino la reactidiad de vue hace como un eco...
		...options,
		headers: {
			...headers,
			...options?.headers,
		}
	})
}
