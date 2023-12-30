export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === '/home') {
        return navigateTo('/', { replace: true})
    }
})
