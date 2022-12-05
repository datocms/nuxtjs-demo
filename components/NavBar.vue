<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">
          <img src="/bulma.png" alt="Logo" />
        </nuxt-link>
        <span class="navbar-burger burger" v-on:click="toggleNavbar">
          <span></span>ß
          <span></span>
          <span></span>
        </span>
      </div>
      <div :class="['navbar-menu', navbarOpen && 'is-active']">
        <div class="navbar-end">
          <nuxt-link class="navbar-item is-active is-size-5 has-text-weight-semibold" to="/">
            Home
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">

const navbarOpen = ref<boolean>(false)

const toggleNavbar = () => { navbarOpen.value = !navbarOpen.value }

</script>

<style>
nav.navbar {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important;
}
</style>
