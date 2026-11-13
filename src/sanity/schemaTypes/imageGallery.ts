import { defineArrayMember, defineField, defineType } from "sanity";

export const imageGallery = defineType({
  name: "imageGallery",
  title: "Image gallery",
  type: "object",
  fields: [
    defineField({
      name: "images",
      type: "array",
      validation: (r) => r.required().min(2).max(4),
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", type: "string" }), defineField({ name: "caption", type: "string" })],
        }),
      ],
    }),
  ],
  preview: { select: { images: "images" }, prepare: ({ images }) => ({ title: `Gallery (${images?.length ?? 0} images)` }) },
});
