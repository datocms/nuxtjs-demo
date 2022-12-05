if [[ -n "${VERCEL}" && -n "${VERCEL_ENV}" && $VERCEL_ENV == "preview" ]]; then
  NITRO_PRESET=vercel-edge nuxt build
elif [[ -n "${NETLIFY}" && -n "${CONTEXT}" && $CONTEXT == "branch-deploy" ]]; then
  NITRO_PRESET=netlify-edge nuxt build
else
  nuxt build
fi
