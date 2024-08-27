// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@element-plus/nuxt'],
  css: ['@fortawesome/fontawesome-free/css/all.min.css'],
  plugins: ['~/plugins/firebase.ts'],
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/Bake&Create/' : '/',
    buildAssetsDir: '/static/'
  }
})
