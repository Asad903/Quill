import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

/** Customer logos for the homepage marquee. One entry per company. */
const logos = defineCollection({
  loader: file("./src/content/logos.json"),
  schema: z.object({
    /** Company name, shown as a wordmark. */
    name: z.string(),
    /** Position in the strip, lowest first. */
    order: z.number().default(0),
  }),
});

/** Pricing tiers, left to right by `order`. */
const pricing = defineCollection({
  loader: file("./src/content/pricing.json"),
  schema: z.object({
    order: z.number().default(0),
    name: z.string(),
    /** One line under the name. */
    description: z.string(),
    /** Shown large, e.g. `$49` or `Custom`. */
    price: z.string(),
    /** Shown beside the price, e.g. `/mo`. Omit for a price with no period. */
    period: z.string().optional(),
    /** Button label. */
    cta: z.string(),
    /** Button destination. */
    href: z.string(),
    /** Dark, raised card for the plan to push. */
    featured: z.boolean().default(false),
    /** Small label on a featured card. */
    badge: z.string().optional(),
    features: z.array(z.string()),
  }),
});

/** Questions for the FAQ, top to bottom by `order`. */
const faqs = defineCollection({
  loader: file("./src/content/faqs.json"),
  schema: z.object({
    order: z.number().default(0),
    question: z.string(),
    answer: z.string(),
  }),
});

export const collections = { logos, pricing, faqs };
