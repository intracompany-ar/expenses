import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApiFetch } from '@/composables/useApiFetch' // Ajustá según tu ruta real
import { useRuntimeConfig } from '#imports' 

export const useAuth = defineStore('auth', () => {

	const user = ref<object | null>(null)
	const isLoading = ref<boolean>(false)
	
	const fetchErrorMessage = ref<string>('')

	const getUser = computed(() => user.value)
	const isLoggedIn = computed(() => !!user.value)

	async function fetchUser() {
		isLoading.value = true
		try {
			const { data, error } = await useApiFetch(`/api/user/me`)
			if (!data) {
				throw new Error('Sesión expirada o token inválido')
			}
			user.value = data.value
		} catch (error) {
			user.value = null
			fetchErrorMessage.value = error.message || 'Ocurrió un error'
		} finally {
			isLoading.value = false
		}
	}

	async function logout() {
		await useApiFetch('/logout', { method: 'POST' })
		user.value = null
		const runtimeConfig = useRuntimeConfig()
		window.location.href = runtimeConfig.public.authBase + '/login?app_id='+useRuntimeConfig().public.appId
		resetStore()
	}

	function resetStore() {
		user.value = null
		isLoading.value = false
	}

	return {
		user,
		isLoading,
		getUser,
		isLoggedIn,// no usarla como isLoggedIn.value, no se por qué no funciona => usar isLoggedIn sin el value
		fetchUser,
		logout,
		resetStore,
		fetchErrorMessage
	}

})
