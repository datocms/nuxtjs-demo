import { previewModeEncryptionSecretHash, PREVIEW_MODE_COOKIE_NAME } from '~/utils/preview'

export default eventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  const cookie = getCookie(event, PREVIEW_MODE_COOKIE_NAME)

  if (!cookie) {
    return { enabled: false }
  }

  const hash = previewModeEncryptionSecretHash(runtimeConfig.previewModeEncryptionSecret)

  if (cookie === hash) {
    return {
      enabled: true,
      token: runtimeConfig.draftEnabledToken,
    }
  }

  return { enabled: false }
})
