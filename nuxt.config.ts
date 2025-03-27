import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
    colorMode: {
        preference: "dark",
    },

    srcDir: "./",
    devtools: { enabled: false },

    vite: {
        vue: {
            customElement: true,
            template: {
                transformAssetUrls,
            },
        },
    },

    modules: [
        (_options, nuxt) => {
            nuxt.hooks.hook("vite:extendConfig", (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({ autoImport: true }));
            });
        },
        "@pinia/nuxt",
        "pinia-plugin-persistedstate/nuxt",
        "dayjs-nuxt",
        "@intracompany/nuxt-kit",
        "@vite-pwa/nuxt",
    ],

    css: ["/assets/css/main.css"],

    build: {
        // Le indica a nuxt que estos paquetes tiene componentes que debe considerarse parte del proyecto, los .vue por ejemplo
        transpile: ["vuetify"],
    },

    app: {
        head: {
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1, maximum-scale=5",
            link: [
                {
                    rel: "icon",
                    type: "image/png",
                    href: "/img/IceSoloV3_32x32.png",
                },
                {
                    rel: "apple-touch-icon",
                    sizes: "180x180",
                    href: "/img/IceSoloV3_180x180.png",
                },
                {
                    rel: "mask-icon",
                    href: "/img/IceSoloV3_32x32.png",
                    color: "#FFFFFF",
                },
            ],
            meta: [{ name: "theme-color", content: "#114c5f" }],
        },
    },

    // Variables por entorno
    $production: {
        //   routeRules: {
        // '/**': { isr: true }
        //   }
    },

    $development: {},

    //  Variables public se mestra, las demás quedan en backend

    runtimeConfig: {
        // The private keys which are only available server-side
        //   apiSecret: '123',
        // Keys within public are also exposed client-side
        public: {
            appBase: process.env.APP_URL,
            apiBase: process.env.API_URL,
			authBase: process.env.AUTH_URL,
            appId: process.env.APP_ID,
            redirectAuth: `${process.env.AUTH_URL}/login?app_id=${process.env.APP_ID}`,
        },
    },

    pwa: {
        manifest: false, // Para que tome desde el archivo manifest.webmanifest ó manifest.json, manifest.json intenté pero tira error, uso webmanifest
        workbox: {
            navigateFallback: "/",
        },
        client: {
            installPrompt: true,
        },
        devOptions: {
            enabled: true,
            type: "module",
        },
    },

    compatibilityDate: "2025-01-19",
});
