<template>
  <div class="p-1" :class="{ 'has-text-white has-background-dark': isPreview }">
    <Container>
      <div v-if="isPreview" class="has-text-centered">
        This is page is showing draft content.
        <a @click="disablePreview">Click here</a>
        to exit preview mode.
      </div>
      <div v-else class="has-text-centered">
        This is page is showing published content.
        <a @click="enablePreview">Click here</a>
        to enter preview mode!
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">

import { PREVIEW_MODE_COOKIE_NAME } from "~/utils/preview";

const cookie = useCookie(PREVIEW_MODE_COOKIE_NAME)

const isPreview = computed(() => !!cookie.value)

const enablePreview = () => {
  const password = prompt("Enter the password to enable preview mode, please:", "Only for the purpose of the demo, password is \"42\"");

  if(password !== null) {
    window.location.href = `/api/enable-preview?secret=${password}`
  }
}

const disablePreview = () => {
  window.location.href = '/api/disable-preview'
}

</script>
