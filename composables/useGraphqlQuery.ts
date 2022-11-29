import { useQuerySubscription } from "vue-datocms";

import { PREVIEW_MODE_COOKIE_NAME } from "~/utils/preview";

const isClient = typeof window !== 'undefined'

type EnabledPreview = {
  enabled: true;
  token: string;
}

type DisabledPreview = {
  enabled: false;
}

type Preview =
  | EnabledPreview
  | DisabledPreview

function isEnabledPreview (preview: Preview): preview is EnabledPreview {
  return preview.enabled === true
}

export default async function useGraphqlQuery (
  { query, key, variables = {} }:
  { query: any, key: string, variables?: Record<string, any> }
) {
  const jwt = useCookie(PREVIEW_MODE_COOKIE_NAME)

  const runtimeConfig = useRuntimeConfig()

  const endpoint = runtimeConfig.public.datocms.endpoint
  const environment = runtimeConfig.public.datocms.environment

  const { data: initialData } = await fetchPublished({
    endpoint,
    token: runtimeConfig.public.datocms.bundleSafeToken,
    query,
    variables,
    environment,
  });

  if (jwt.value) {
    const preview = await $fetch<Preview>('/api/preview');

    if (isClient && isEnabledPreview(preview)) {
      return subscribeToDrafts({
        query,
        variables,
        initialData: initialData.value,
        token: preview.token,
        environment,
      })
    }
  }

  return { data: initialData }
}

async function fetchPublished(
  { endpoint, token, query, variables, environment }:
  { endpoint: string, token: string, query: any, variables: Record<string, any>, environment?: string }
) {
  const data = ref<any>(null);

  const fullEndpoint = environment ? `${endpoint}/environments/${environment}` : endpoint

  const fetchedData = await $fetch<{ data?: any; } | { errors?: any; }>(fullEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: {
      query,
      variables
    },
  });

  if ('errors' in fetchedData) {
    throw JSON.stringify(fetchedData.errors);
  }

  if ('data' in fetchedData) {
    data.value = fetchedData.data;
  }

  return { data };
}

async function subscribeToDrafts (
  { query, variables = {}, token, initialData, environment }:
  { query: any, variables?: Record<string, any>, token: string; initialData: any; environment?: string; }
) {
  return useQuerySubscription({
    query,
    variables,
    token,
    initialData,
    includeDrafts: true,
    environment,
  })
}
