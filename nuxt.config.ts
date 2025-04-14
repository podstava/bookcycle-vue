// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api/v1',
      web3FormsKey: process.env.NUXT_PUBLIC_WEB3FORMS_KEY || ''
    },
  },
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    "nuxt-icon",
    '@pinia/nuxt',
  ],
  
  compatibilityDate: "2025-04-12",
});
