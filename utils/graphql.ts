import { format, parseISO } from "date-fns";

export const imageFields = `
  fragment imageFields on ResponsiveImage {
    src
    width
    height
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

export const formatDate = (date: string) => format(parseISO(date), 'PPP')
