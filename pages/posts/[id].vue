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
                <h2 v-if="post.publicationDate" class="subtitle is-4">
                  {{ formatDate(post.publicationDate) }}
                </h2>
                <h1 class="title">
                  <nuxt-link :to="`/posts/${post.slug}`">{{
                      post.title
                  }}</nuxt-link>
                </h1>
                <datocms-structured-text :data="post.content" :renderBlock="renderBlock" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

import { h } from "vue";

import { imageFields, seoMetaTagsFields, formatDate } from '~~/utils/graphql'

import { toHead, Image as DatocmsImage, StructuredText as DatocmsStructuredText } from 'vue-datocms';

const route = useRoute()

const { data } = await useGraphqlQuery({
  query: `
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
        content {
          value
          blocks {
            __typename
            ... on ImageBlockRecord {
              id
              image {
                responsiveImage(
                  imgixParams: { fm: jpg, fit: crop, w: 2000, h: 1000 }
                ) {
                  ...imageFields
                }
              }
            }
          }
        }
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
    slug: route.params.id,
  },
  key: route.fullPath,
})

const post = computed(() => data.value.post)
const site = computed(() => data.value.site)

const ready = computed(() => !!data.value)

useHead(() => {
  if (!post.value) {
    return {}
  }

  return toHead(post.value.seo, site.value.favicon)
})

const renderBlock = ({ record }) => {
  if (record.__typename === 'ImageBlockRecord') {
    return h(
      'div',
      { class: "mb-5" },
      [
        h("datocms-image", { props: { data: record.image.responsiveImage } }),
      ]
    );
  }

  return h(
    'div',
    {},
    [
      h('p', {}, "Don't know how to render a block!"),
      h('pre', {}, JSON.stringify(record, null, 2)),
    ]
  );
}

</script>
