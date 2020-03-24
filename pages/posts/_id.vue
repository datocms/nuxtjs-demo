<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-8 is-offset-2">
            <figure class="image">
              <datocms-image :data="post.coverImage.responsiveImage" />
            </figure>
          </div>
        </div>

        <section class="section">
          <div class="columns">
            <div class="column is-8 is-offset-2">
              <div class="content is-medium">
                <h2 class="subtitle is-4">
                  {{ formatDate(post.publicationDate) }}
                </h2>
                <h1 class="title">
                  <nuxt-link :to="`/posts/${post.slug}`">{{
                    post.title
                  }}</nuxt-link>
                </h1>
                <div v-html="post.content" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import { request, gql, imageFields, seoMetaTagsFields } from '~/lib/datocms'
import { toHead } from 'vue-datocms'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

export default {
  async asyncData({ params }) {
    const data = await request({
      query: gql`
        query BlogPostQuery($slug: String!) {
          site: _site {
            favicon: faviconMetaTags {
              ...seoMetaTagsFields
            }
          }

          post(filter: { slug: { eq: $slug } }) {
            seo: _seoMetaTags {
              ...seoMetaTagsFields
            }
            id
            title
            slug
            publicationDate: _firstPublishedAt
            content
            coverImage {
              responsiveImage(imgixParams: { fit: crop, ar: "16:9", w: 860 }) {
                ...imageFields
              }
            }
            author {
              name
              picture {
                responsiveImage(imgixParams: { fit: crop, ar: "1:1", w: 40 }) {
                  ...imageFields
                }
              }
            }
          }
        }

        ${imageFields}
        ${seoMetaTagsFields}
      `,
      variables: {
        slug: params.id
      }
    })

    return { ready: !!data, ...data }
  },
  methods: {
    formatDate(date) {
      return format(parseISO(date), 'PPP')
    }
  },
  head() {
    if (!this.ready) {
      return
    }

    return toHead(this.post.seo, this.site.favicon)
  }
}
</script>
