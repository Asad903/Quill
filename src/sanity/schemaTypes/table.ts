import { defineArrayMember, defineField, defineType } from "sanity";

export const table = defineType({
  name: "table",
  title: "Table",
  type: "object",
  fields: [
    defineField({ name: "caption", type: "string" }),
    defineField({
      name: "hasHeaderRow",
      type: "boolean",
      initialValue: true,
      description: "Treat the first row as a header.",
    }),
    defineField({
      name: "rows",
      type: "array",
      validation: (r) => r.required().min(1),
      of: [
        defineArrayMember({
          type: "object",
          name: "tableRow",
          fields: [defineField({ name: "cells", type: "array", of: [{ type: "string" }] })],
          preview: {
            select: { cells: "cells" },
            prepare: ({ cells }) => ({ title: (cells ?? []).join("  |  ") }),
          },
        }),
      ],
    }),
  ],
  preview: { select: { title: "caption", rows: "rows" }, prepare: ({ title, rows }) => ({ title: title || "Table", subtitle: `${rows?.length ?? 0} rows` }) },
});
