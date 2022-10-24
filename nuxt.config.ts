// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    'bulma',
  ],
  runtimeConfig: {
    public: {
      datocms: {
        token: process.env.NUXT_ENV_DATOCMS_API_TOKEN,
        environment: process.env.NUXT_ENV_DATOCMS_ENVIRONMENT,
        endpoint: 'https://graphql.datocms.com'
      }
    }
  }
})

