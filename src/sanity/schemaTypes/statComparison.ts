import { defineField, defineType } from "sanity";

export const statComparison = defineType({
  name: "statComparison",
  title: "Before / after stat",
  type: "object",
  fields: [
    defineField({ name: "beforeValue", type: "string", validation: (r) => r.required() }),
    defineField({ name: "beforeLabel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "afterValue", type: "string", validation: (r) => r.required() }),
    defineField({ name: "afterLabel", type: "string", validation: (r) => r.required() }),
  ],
  preview: {
    select: { before: "beforeValue", after: "afterValue" },
    prepare: ({ before, after }) => ({ title: `${before} → ${after}` }),
  },
});
