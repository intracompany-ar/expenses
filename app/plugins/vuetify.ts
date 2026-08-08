// import this after install `@mdi/font` package
import '@fortawesome/fontawesome-free/css/all.css' // Ensure your project is capable of handling css files
import { aliases, fa } from 'vuetify/iconsets/fa'
import { md3 } from 'vuetify/blueprints'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import {VDateInput } from "vuetify/labs/components"

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        theme: {
            defaultTheme: 'dark'
        },
        components: {
            VDateInput
        },
        blueprint: md3,
        icons: {
            defaultSet: 'fa',
            aliases,
            sets: {
                fa,
            },
        },
    })
    app.vueApp.use(vuetify)
})