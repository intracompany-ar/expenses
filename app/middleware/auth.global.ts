export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return

  const auth = useAuth()
  if (!auth.user && !auth.isLoading) await auth.fetchUser()

  if (!auth.isLoggedIn) {
    const config = useRuntimeConfig()
    const message = auth.fetchErrorMessage || 'No está logueado'
    const separator = config.public.redirectAuth.includes('?') ? '&' : '?'
    return navigateTo(
      `${config.public.redirectAuth}${separator}message=${encodeURIComponent(message)}`,
      { external: true },
    )
  }
})
