import { format, parseISO } from "date-fns";

export const imageFields = `
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

export const seoMetaTagsFields = `
  fragment seoMetaTagsFields on Tag {
    attributes
    content
    tag
  }
`;

export const formatDate = (date) => format(parseISO(date), 'PPP')