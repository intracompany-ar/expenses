import { defineStore } from 'pinia'

interface AuthStoreState {
	user: null | object;
}

export const useAuthStore = defineStore('auth', {

	state: (): AuthStoreState => ({
		user: null,
	}),

	persist: {
		paths: ['user'],
	},

	getters: {
		
		getUser: (state) => state.user,
		isAuthenticated: (state) => {
			const token = useTokenStore()
			return token.getStatus
		},
	},

	actions: {
		async login(formData: object) {
			try {
				const token = useTokenStore()
				const { data, error } = await useApiFetch('/api/login', {
					method: 'POST',
					body: { ...formData }
				});
				if (error.value) {
					throw error;
				}
				token.setToken(data.value.data.token);
				this.user = data.value.data.user
				return navigateTo('/')
			} catch (error) {
				throw error;
			};
		},

		async logout() {
			try {
				const token = useTokenStore()
				const response = await useApiFetch('/api/logout', { method: 'POST' });
				token.removeToken();
				this.$reset()
				console.log(response)
				return navigateTo('/login')
			} catch (error) {
				throw error;
			};
		}
	}

})
