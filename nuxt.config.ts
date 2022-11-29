// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    'bulma',
  ],
  runtimeConfig: {
    previewModeEncryptionSecret:
      // !> Before releasing to production, see the README
      process.env.NUXT_ENV_PREVIEW_MODE_ENCRYPTION_SECRET ||
      "Use NUXT_ENV_PREVIEW_MODE_ENCRYPTION_SECRET environment variable to set a random string and encrypt the preview mode cookie",

    previewModePassword:
      // !> Before releasing to production, see the README:
      // !> be sure to set a proper password to limit the access to preview mode
      process.env.NUXT_ENV_PREVIEW_MODE_PASSWORD || "42",

    draftEnabledToken:
      // !> Before releasing to production, see the README for information concerning security
      // !> and be sure to use tokens with the minimum amount of permission
      process.env.NUXT_ENV_DATOCMS_API_DRAFT_ENABLED_TOKEN ||
      process.env.NUXT_ENV_DATOCMS_API_TOKEN,

    public: {
      datocms: {
        bundleSafeToken:
          // !> Before releasing to production, see the README for information concerning security
          // !> and be sure to use tokens with the minimum amount of permission
          process.env.NUXT_ENV_DATOCMS_API_BUNDLE_SAFE_TOKEN ||
          process.env.NUXT_ENV_DATOCMS_API_TOKEN,

        environment: process.env.NUXT_ENV_DATOCMS_ENVIRONMENT,
        endpoint: 'https://graphql.datocms.com'
      }
    }
  }
})

