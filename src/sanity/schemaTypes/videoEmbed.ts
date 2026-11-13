import { defineField, defineType } from "sanity";

export const videoEmbed = defineType({
  name: "videoEmbed",
  title: "Video embed",
  type: "object",
  fields: [
    defineField({ name: "url", type: "url", description: "YouTube or Vimeo link.", validation: (r) => r.required() }),
    defineField({ name: "caption", type: "string" }),
  ],
  preview: { select: { title: "caption", subtitle: "url" } },
});
