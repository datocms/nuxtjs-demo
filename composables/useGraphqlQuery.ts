export default async function useGraphqlQuery (
  { query, key, variables = {}, preview = false }:
  { query: any, key: string, variables?: Record<string, any>, preview?: boolean }
) {
  const runtimeConfig = useRuntimeConfig()

  let endpoint = runtimeConfig.public.datocms.endpoint

  if (runtimeConfig.public.datocms.environment) {
    endpoint += `/environments/${runtimeConfig.public.datocms.environment}`
  }

  if (preview) {
    endpoint += '/preview'
  }

  const data = ref<any>(null)

  const { data: fetchedData, pending, error, refresh } = await useFetch<{ data?: any; errors?: any }>(() => endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${runtimeConfig.public.datocms.token}`
    },
    body: {
      query,
      variables
    },
    key
  })

  if (fetchedData.value.errors) {
    throw JSON.stringify(fetchedData.value.errors)
  }

  data.value = fetchedData.value.data

  return { data, pending, error, refresh }
}
