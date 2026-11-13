import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      description: "Shown on cards and under the article title.",
      validation: (r) => r.required().max(240),
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "publishedAt", type: "datetime", validation: (r) => r.required() }),
    defineField({
      name: "readTime",
      title: "Read time (minutes)",
      type: "number",
      validation: (r) => r.min(1).integer(),
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
      description: "Show in the featured carousel at the top of the blog.",
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string" }),
        defineField({ name: "caption", type: "string", description: "e.g. Illustration · Quill Agents 2.0" }),
      ],
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Strike", value: "strike-through" },
              { title: "Inline code", value: "code" },
              { title: "Highlight", value: "highlight" },
              { title: "Superscript", value: "sup" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({ name: "href", type: "url", validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }) }),
                  defineField({ name: "newTab", type: "boolean", initialValue: false }),
                ],
              },
              {
                name: "internalLink",
                type: "object",
                title: "Link to post",
                fields: [defineField({ name: "reference", type: "reference", to: [{ type: "post" }] })],
              },
            ],
          },
        }),
        defineArrayMember({ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string" }), defineField({ name: "caption", type: "string" })] }),
        defineArrayMember({ type: "imageGallery" }),
        defineArrayMember({ type: "codeBlock" }),
        defineArrayMember({ type: "table" }),
        defineArrayMember({ type: "callout" }),
        defineArrayMember({ type: "pullQuote" }),
        defineArrayMember({ type: "videoEmbed" }),
        defineArrayMember({ type: "ctaButton" }),
        defineArrayMember({ type: "statComparison" }),
      ],
    }),
    defineField({
      name: "relatedPosts",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "post" }] })],
      validation: (r) => r.max(3),
      description: "Shown under “Keep reading”. Leave empty to use the latest posts.",
    }),
    defineField({ name: "seoTitle", type: "string" }),
    defineField({ name: "seoDescription", type: "text", rows: 2 }),
  ],
  orderings: [
    { title: "Newest first", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "category.title", media: "coverImage" },
  },
});
