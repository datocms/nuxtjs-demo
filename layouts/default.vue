<template>
  <div>
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <nuxt-link class="navbar-item" to="/">
            <img src="/bulma.png" alt="Logo" />
          </nuxt-link>
          <span class="navbar-burger burger" v-on:click="toggleNavbar">
            <span></span>
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

    <nuxt />

    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Bulma - Blog theme</strong> by
          <a href="https://gonzalojs.com">Gonzalo Gutierrez</a>. Based on the
          <a href="http://jigsaw-blog-staging.tighten.co/">jigsaw-blog</a>. The
          source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navbarOpen: false
    }
  },
  methods: {
    toggleNavbar() {
      this.navbarOpen = !this.navbarOpen
    }
  }
}
</script>

<style>
nav.navbar {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important;
}
</style>
