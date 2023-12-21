export default defineNuxtPlugin(() => {
  return {
    provide: {
      enablePreviewUrl: () => '/api/enable-preview',
      disablePreviewUrl: () => '/api/disable-preview',

      isPreviewEnabled,
    },
  };
});

function isPreviewEnabled() {
  const cookie = useCookie('__datocms_preview_data');

  return computed(() => !!cookie.value);
}
