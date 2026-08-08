interface AuthUser {
  name: string
  [key: string]: unknown
}

export const useAuth = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const isLoading = ref(false)
  const fetchErrorMessage = ref('')
  const getUser = computed(() => user.value)
  const isLoggedIn = computed(() => Boolean(user.value))

  async function fetchUser() {
    isLoading.value = true
    fetchErrorMessage.value = ''
    try {
      const { data, error } = await useApiFetch<AuthUser>('/api/user/me')
      if (error.value) throw error.value
      if (!data.value) throw new Error('Sesión expirada o token inválido')
      user.value = data.value
    } catch (error) {
      resetStore()
      fetchErrorMessage.value = error instanceof Error ? error.message : 'Ocurrió un error'
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    await useApiFetch('/logout', { method: 'POST' })
    resetStore()
    return navigateTo(useRuntimeConfig().public.redirectAuth, { external: true })
  }

  function resetStore() {
    user.value = null
    isLoading.value = false
  }

  return { user, isLoading, getUser, isLoggedIn, fetchUser, logout, resetStore, fetchErrorMessage }
})
