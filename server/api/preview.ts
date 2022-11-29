import { jwtVerify } from "jose"

import { PREVIEW_MODE_COOKIE_NAME } from "~/utils/preview";

export default eventHandler(async event => {
  const runtimeConfig = useRuntimeConfig()

  const jwt = getCookie(event, PREVIEW_MODE_COOKIE_NAME)

  if (!jwt) {
    return { enabled: false }
  }

  const secret = new TextEncoder().encode(runtimeConfig.previewModeEncryptionSecret)

  try {
    await jwtVerify(jwt, secret, {})

    return {
      enabled: true,
      token: runtimeConfig.draftEnabledToken,
    }
  } catch (error) {
    return { enabled: false }
  }
})
