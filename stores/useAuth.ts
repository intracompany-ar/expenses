import { defineStore } from 'pinia'

interface AuthStoreState {
	user: null | object;
}

export const useAuth = defineStore('auth', {

	state: (): AuthStoreState => ({
		user: null,
	}),

	persist: {
		paths: ['user'],
	},

	getters: {
		
		getUser: (state) => state.user,
		isAuthenticated: (state) => {
			const token = useToken()
			return token.getStatus
		},
	},

	actions: {
		async login(formData: object) {
			try {
				const token = useToken()
				const { data, error } = await useApiFetch('/api/login', {
					method: 'POST',
					body: { ...formData }
				});
				if (error.value) {
					throw error;
				}
				token.setToken(data.value.data.token);
				this.user = data.value.data.user
				navigateTo('/')
			} catch (error) {
				throw error;
			};
		},

		async logout() {
			try {
				const token = useToken()
				const response = await useApiFetch('/api/logout', { method: 'POST' });
				token.removeToken();
				this.$reset()
				console.log(response)
				navigateTo('/login')
			} catch (error) {
				throw error;
			};
		}
	}

})
