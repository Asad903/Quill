import { defineField, defineType } from "sanity";

export const codeBlock = defineType({
  name: "codeBlock",
  title: "Code block",
  type: "object",
  fields: [
    defineField({ name: "language", type: "string", initialValue: "ts" }),
    defineField({ name: "code", type: "text", rows: 8, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "language", subtitle: "code" } },
});
