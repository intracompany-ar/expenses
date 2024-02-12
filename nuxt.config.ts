export default defineNuxtConfig({

	srcDir: './',

	devtools: { enabled: false },

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
		// 'commons_front',
		'@nuxt/ui',
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
		'dayjs-nuxt',
		'@vite-pwa/nuxt',
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
		'/assets/css/main.css',
	],

	build: {
	},

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
	},
	// ,

	// imports: {
	// 	presets: [
	// 		{
	// 			from: 'commons_front',
	// 			imports: ['useStoreAdvices']
	// 		}
	// 	]
	// }

	pwa: {
		client: {
			installPrompt: true
		}
	}
})
