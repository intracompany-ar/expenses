// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtPage } from 'nuxt/schema'

export default defineNuxtConfig({
	devtools: { enabled: true },

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
	},

	modules: [
				'nuxt-icon',
					'@pinia/nuxt',
					'@nuxtjs/tailwindcss'
	],

	tailwindcss: {
					exposeConfig: true,
					viewer: true,
					
					cssPath: '~/assets/css/tailwind.css',
					configPath: '~/config/tailwind.js',
					exposeLevel: 2,
					config: {},
					injectPosition: 'first',
	},

	css: [
					'/assets/css/main.css'
	],

	
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
	}
})
