import axios from 'axios'
import gql from 'graphql-tag'

export { default as gql } from 'graphql-tag'

export async function request({ query, variables, preview }) {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`

  const { data } = await axios.post(
    endpoint,
    {
      query: query.loc && query.loc.source.body,
      variables
    },
    {
      headers: {
        Authorization:
          `Bearer ${process.env.NUXT_ENV_DATOCMS_API_TOKEN}`
      }
    }
  )

  if (data.errors) {
    throw JSON.stringify(data.errors)
  }

  return data.data
}

export const imageFields = gql`
  fragment imageFields on ResponsiveImage {
    aspectRatio
    base64
    height
    sizes
    src
    srcSet
    webpSrcSet
    width
    alt
    title
  }
`;

export const seoMetaTagsFields = gql`
  fragment seoMetaTagsFields on Tag {
    attributes
    content
    tag
  }
`;