import { defineStore } from 'pinia';

type User = {
    id: number;
    name: string;
    email: string;
};

export const useAuthStore = defineStore('auth', () => {
    
    const user = ref<User | null>(null);

    const isLoggedIn = computed(() => !!user.value);

    async function fetchUser() {
        const { data } = await useApiFetch('/api/user')

        user.value = data.value as User;
    }


    type Credentials = {
        name: string;
        password: string;
    };

    async function login(credentials: Credentials) {
        await useApiFetch('/sanctum/csrf-cookie')
        
        const login = await useApiFetch('/login', {
            method: 'POST',
            body: credentials
        })

        await fetchUser()

        return login;
    }
    
    async function logout() {
        await useApiFetch('/logout', {
            method: 'POST'
        })

        user.value = null;
        navigateTo('/login')
    }

    return { user, login, isLoggedIn, logout, fetchUser };
})