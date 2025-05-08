import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: ['@nuxt/fonts', '@nuxt/image', '@nuxt/icon', '@nuxtjs/i18n', '@pinia/nuxt'],
    i18n: {
        locales: [
            { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
            { code: 'ru', language: 'ru-RU', file: 'ru.json', name: 'Русский' }
        ],
        defaultLocale: 'en',
        lazy: true,
        langDir: 'locales/',
    },
    pages: true,
    typescript: {
        strict: true
    },
    vite: {
        plugins: [tailwindcss()]
    },
    css: ["public/main.css"],
    components: [
        {
            path: 'shared',
            extensions: ['.vue'],
            prefix: 'Shared',
            pathPrefix: false
        },
        {
            path: 'features',
            extensions: ['.vue'],
            pathPrefix: false,
            prefix: 'Feature'
        },
        {
            path: 'widgets',
            pathPrefix: false,
            extensions: ['.vue'],
            prefix: 'Widget'
        },
        {
            path: 'entities',
            extensions: ['.vue'],
            pathPrefix: false,
            prefix: 'Entity'
        }
    ],
    imports: {
        dirs: [
            './shared/**/*.ts',
            './features/**/*.ts',
            './widgets/**/*.ts',
            './entities/**/*.ts'
        ]
    },
    runtimeConfig: {
        public: {
            apiBase: process.env.API_HOST
        }
    },
    pinia: {
        storesDirs: [
            './shared/**/model',
            './features/**/model',
            './widgets/**/model',
            './entities/**/model'
        ]
    }
});