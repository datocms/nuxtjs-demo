import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/#routeroptions
export default <RouterConfig>{
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) { return savedPosition }

    else {
      return {
        top: 0,
        behavior: 'smooth',
      }
    }
  }
}