import { sanityClient } from "sanity:client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/types";

export const POSTS_PER_PAGE = 6;

export type SanityImage = {
  asset: { _ref: string };
  alt?: string;
  caption?: string;
};

export type Author = {
  name: string;
  slug: string;
  role?: string;
  bio?: string;
};

export type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readTime?: number;
  featured: boolean;
  category: { title: string; slug: string };
  author: Author;
  coverImage?: SanityImage;
};

export type Post = PostSummary & {
  tags?: string[];
  body: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
  relatedPosts?: PostSummary[];
};

const builder = createImageUrlBuilder(sanityClient);

/** Builds a sized Sanity image URL, cropped to a ratio when `height` is given. */
export function imageUrl(image: SanityImage, width: number, height?: number): string {
  let url = builder.image(image).width(width).auto("format").quality(80);
  if (height) url = url.height(height).fit("crop");
  return url.url();
}

const summaryFields = `
  _id, title, "slug": slug.current, excerpt, publishedAt, readTime, featured,
  coverImage,
  "category": category->{ title, "slug": slug.current },
  "author": author->{ name, "slug": slug.current, role }
`;

export function getCategories(): Promise<{ title: string; slug: string }[]> {
  return sanityClient.fetch(
    `*[_type == "category"] | order(title asc){ title, "slug": slug.current }`,
  );
}

export function getFeaturedPost(): Promise<PostSummary | null> {
  return sanityClient.fetch(
    `*[_type == "post" && featured == true] | order(publishedAt desc)[0]{ ${summaryFields} }`,
  );
}

export async function getPosts(options: {
  category?: string;
  page?: number;
}): Promise<{ posts: PostSummary[]; total: number }> {
  const page = Math.max(1, options.page ?? 1);
  const start = (page - 1) * POSTS_PER_PAGE;
  const filter = `_type == "post" && (!defined($category) || category->slug.current == $category)`;
  const params = { category: options.category ?? null, start, end: start + POSTS_PER_PAGE };
  const [posts, total] = await Promise.all([
    sanityClient.fetch<PostSummary[]>(
      `*[${filter}] | order(publishedAt desc)[$start...$end]{ ${summaryFields} }`,
      params,
    ),
    sanityClient.fetch<number>(`count(*[${filter}])`, params),
  ]);
  return { posts, total };
}

export function getPost(slug: string): Promise<Post | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      ${summaryFields}, tags, seoTitle, seoDescription,
      "author": author->{ name, "slug": slug.current, role, bio },
      body[]{
        ...,
        markDefs[]{ ..., _type == "internalLink" => { "slug": @.reference->slug.current } }
      },
      "relatedPosts": coalesce(
        relatedPosts[]->{ ${summaryFields} },
        *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3]{ ${summaryFields} }
      )
    }`,
    { slug },
  );
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatLongDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function initials(name: string): string {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}
