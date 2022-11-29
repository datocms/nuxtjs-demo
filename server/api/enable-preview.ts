import { SignJWT } from "jose"

import { PREVIEW_MODE_COOKIE_NAME } from "~/utils/preview";

export default eventHandler(async event => {
  const runtimeConfig = useRuntimeConfig()
  const query = getQuery(event)

  // Please set the NUXT_ENV_PREVIEW_MODE_PASSWORD env variable
  // on Vercel/Netlify, or everyone will be able to enter Preview Mode and
  // see draft content!

  const password = runtimeConfig.previewModePassword;

  // Check the secret and next parameters
  if (query.secret !== password) {
    sendError(event, createError({
      statusCode: 401,
      message: 'Missing or invalid `secret` query string parameter!'
    }))

    return
  }

  const secret = new TextEncoder().encode(runtimeConfig.previewModeEncryptionSecret)
  const alg = 'HS256'

  const jwt = await new SignJWT({})
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .sign(secret)

  setCookie(event, PREVIEW_MODE_COOKIE_NAME, jwt)

  // Redirect to the homepage, or to the URL provided with the `redirect` query
  // string parameter:
  const redirectUrl = (query.redirect || ['/'])[0]

  sendRedirect(event, redirectUrl)

  event.node.res.end()
})

