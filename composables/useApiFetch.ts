import type { UseFetchOptions } from '#app'



export async function useApiFetch<T>(path: string | (() => string), options: UseFetchOptions<T> = {}) {

	const tokenStore = useTokenStore()
	
	const config = useRuntimeConfig()

	let headers: any = {
		// https://laravel.com/docs/10.x/sanctum#spa-authentication
		Accept: 'application/json',
		Authorization: `Bearer ${tokenStore.getToken}`,
		// referer: config.public.appBase,// Hace que laravel detecte es es un EnsureFrontendRequestsAreStateful, NO quiero porque es API token
	}

	// NO USO porque es API tokens
	// const token = useCookie('XSRF-TOKEN'); // Esto es equivalente a getCookie en Axios, lo pide documentación Laravel Sanctum 
	// if (token.value) {
	// 	headers['X-XSRF-TOKEN'] = token.value
	// }
	
	// // Para evitar el error 405 que aparece en un momento.
	// if (process.server) {
	// 	headers = {
	// 		...headers,
	// 		// ...useRequestHeaders(['cookie'])
	// 	}
	// }

	let data, error;

    try {
        data = await $fetch(config.public.apiBase+path, {
            // credentials: "include",
            // watch: false,
            ...options,
            headers: {
                ...headers,
                ...options?.headers
            }
        })
    }
    catch (e) {
        error = e
    }
    return { data: ref(data), error: ref(error) }


	// Esta forma vi en un video, pero tira error: https://stackoverflow.com/questions/77969656/struggling-to-use-fetch-instead-of-usefetch-in-nuxt
	// return useFetch(config.public.apiBase+path, {
	// 	// credentials: 'include',// Esto es equivalente a withCredentials en Axios, ver docu Laravel Sanctum, persiste cookie me parece
	// 	// watch: false, // Sino la reactidiad de vue hace como un eco...
	// 	...options,
	// 	headers: {
	// 		...headers,
	// 		...options?.headers,
	// 	}
	// })
}