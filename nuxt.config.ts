// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },

	modules: [
		'@pinia/nuxt',
		'@nuxtjs/tailwindcss'
	],

	tailwindcss: {
		exposeConfig: true,
		viewer: true,
		// and more...
	},
	// css: ['/assets/css/main.css'],
	// Variables por entorno 
	// $production: {
	//   routeRules: {
	//     '/**': { isr: true }
	//   }
	// },
	// $development: {
	//   //
	// }


	//  Variables public se mestra, las demás quedan en backend
	
	runtimeConfig: {
	//   // The private keys which are only available server-side
	//   apiSecret: '123',
	//   // Keys within public are also exposed client-side
	//   public: {
	//     apiBase: '/api'
	//   }
	},


	vite: {
		css: {
		preprocessorOptions: {
			scss: {
			additionalData: '@use "~/assets/_colors.scss" as *;'
			}
		}
		},
		vue: {
			customElement: true
		}
	}
})
