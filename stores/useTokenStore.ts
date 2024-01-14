import { defineStore } from 'pinia'

interface TokenStoreState {
	token: null | string;
	loggedIn: boolean;
}

export const useTokenStore = defineStore('token', {

	state: (): TokenStoreState => ({ 
		token: null,
		loggedIn: false
	}),

	persist: true,

	getters: {
		getToken: (state) => state.token,
		getStatus: (state) => state.loggedIn
	},

	actions: {
		setToken(token: string | null) {
			this.token = token;
			this.loggedIn = true
		},

		removeToken() {
			this.$reset()
		}
	}

})
