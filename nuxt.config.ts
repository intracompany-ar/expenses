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
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
	],

	tailwindcss: {
		exposeConfig: true,
		viewer: true,
		
		cssPath: '~/assets/css/tailwind.css',
		configPath: '~/tailwind.config.js',
		exposeLevel: 2,
		config: {},
		injectPosition: 'first',
	},

	css: [
		'/assets/css/main.css'
	],

	srcDir: './',

	// Variables por entorno
	$production: {
		appId: 8
	//   routeRules: {
	    // '/**': { isr: true }
	//   }
	},
	$development: {
	
	},


	//  Variables public se mestra, las demás quedan en backend
	
	runtimeConfig: {
	  // The private keys which are only available server-side
	//   apiSecret: '123',
	  // Keys within public are also exposed client-side
		public: {
			appBase: process.env.APP_URL,
			apiBase: process.env.API_URL,
		}
	}
})
