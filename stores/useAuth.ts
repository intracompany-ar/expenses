import { defineStore } from 'pinia'

interface AuthStoreState {
	user: null | object;
	isLoading: boolean;
}

export const useAuth = defineStore('auth', {

	state: (): AuthStoreState => ({
		user: null,
		isLoading: false
	}),

	getters: {
		getUser: (state) => state.user,
	},

	actions: {

		async fetchUser() {
			const { data, error } = await useApiFetch(`/api/user/me`);
			// if (error.value) {
			// 	this.user = null;
			// 	throw error;
			// }
			this.user = data;
		},

		async logout() {
			await useApiFetch('/logout', {
				method: 'POST',
			});

			this.user = null;
			window.location.href = useRuntimeConfig().public.authBase + '/login'; // Lo mismo que return navigateTo(useRuntimeConfig().public.authBase + "/login", { external: true }); pero esta es la forma Nuxt
			this.$reset()
		}
	}

})
