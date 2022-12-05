import {
  previewModeEncryptionSecretHash,
  PREVIEW_MODE_COOKIE_NAME,
} from '~/utils/preview'

export default eventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const query = getQuery(event)

  // Please set the NUXT_ENV_PREVIEW_MODE_PASSWORD env variable
  // on Vercel/Netlify, or everyone will be able to enter Preview Mode and
  // see draft content!

  const password = runtimeConfig.previewModePassword

  // Check the secret and next parameters
  if (query.secret !== password) {
    sendError(
      event,
      createError({
        statusCode: 401,
        message: 'Missing or invalid `secret` query string parameter!',
      })
    )

    return
  }

  const hash = previewModeEncryptionSecretHash(
    runtimeConfig.previewModeEncryptionSecret
  )

  setCookie(event, PREVIEW_MODE_COOKIE_NAME, hash)

  console.log('query.redirect', JSON.stringify(query.redirect))

  // Redirect to the homepage, or to the URL provided with the `redirect` query
  // string parameter:
  const redirectUrl = Array.isArray(query.redirect)
    ? query.redirect[0] // Redirect can be an array: in that case, I took the first element
    : typeof query.redirect === 'string' // Or else...
    ? query.redirect // ... if it's a string, I use it as it is.
    : '/' // Default is on the root.

  sendRedirect(event, redirectUrl)

  event.node.res.end()
})
