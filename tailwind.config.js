// import defaultTheme from 'tailwindcss/defaultTheme'

const srcDir = '.'

/** @type {import('tailwindcss').Config} */
export default {

	// prefix: 'tw-',// no funciona con nuxt/ui, tengo que dejar bootstrap, pasar todo a tailwind https://github.com/nuxt/ui/issues/220 <- intentaron, pero no le van a dar prioridad los autores

	theme: {
		extend: {
			colors: {
				// primary: defaultTheme.colors.green
			},
			aspectRatio: { // VEr nuxt/ui
				auto: 'auto',
				square: '1 / 1',
				video: '16 / 9'
			}
		},
	},

	content: [

		`${srcDir}/components/**/*.{vue,js,ts}`,
		`${srcDir}/layouts/**/*.vue`,
		`${srcDir}/pages/**/*.vue`,
		`${srcDir}/composables/**/*.{js,ts}`,
		`${srcDir}/plugins/**/*.{js,ts}`,
		`${srcDir}/utils/**/*.{js,ts}`,
		`${srcDir}/App.{js,ts,vue}`,
		`${srcDir}/app.{js,ts,vue}`,
		`${srcDir}/Error.{js,ts,vue}`,
		`${srcDir}/error.{js,ts,vue}`,
		`${srcDir}/app.config.{js,ts}`
	]
}