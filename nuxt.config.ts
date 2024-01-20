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
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
		'dayjs-nuxt',
		'@vite-pwa/nuxt'
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
		'bootstrap/dist/css/bootstrap.css',
		'/assets/css/main.css',
		'@fortawesome/fontawesome-svg-core/styles.css'
	],

	build: {
		// Para que Vue no tire un warn en los iconos
		transpile: [
			'@fortawesome/fontawesome-svg-core',
			'@fortawesome/free-brands-svg-icons',
			'@fortawesome/free-regular-svg-icons',
			'@fortawesome/free-solid-svg-icons'
		]
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
	}
})
