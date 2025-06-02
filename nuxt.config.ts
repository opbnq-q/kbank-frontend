import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: [
      '@nuxt/fonts',
      '@nuxt/image',
      '@nuxt/icon',
      '@nuxtjs/i18n',
      '@pinia/nuxt',
      '@vueuse/nuxt',
      '@nuxtjs/color-mode'
    ],
    i18n: {
        locales: [
            { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
            { code: 'ru', language: 'ru-RU', file: 'ru.json', name: 'Русский' }
        ],
        defaultLocale: 'en',
        lazy: true,
        langDir: 'locales/',
        strategy: 'no_prefix'
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
        autoImport: true,
        dirs: [
            './shared/**/*.ts',
            './features/**/*.ts',
            './widgets/**/*.ts',
            './entities/**/*.ts'
        ]
    },
    runtimeConfig: {
        public: {
            apiBase: process.env.API_HOST,
            wsBase: process.env.WS_BASE
        }
    },
    pinia: {
        storesDirs: [
            './shared/**/*.store.ts',
            './features/**/*.store.ts',
            './widgets/**/*.store.ts',
            './entities/**/*.store.ts'
        ]
    }
});
