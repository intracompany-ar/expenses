import { useAuth } from "~/stores/useAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth = useAuth();
    
    if (!auth.user) {
        await auth.fetchUser();
    }
    
    if (!auth.user) {
        console.log("Redirecting to login");
        return navigateTo(useRuntimeConfig().public.authBase + "/login", { external: true });
    }
});
