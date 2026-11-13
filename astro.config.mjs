// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { SITE_URL } from "./src/consts.ts";
import { isNoindexRoute } from "./src/utils/seo.ts";

import cloudflare from "@astrojs/cloudflare";

import sanity from "@sanity/astro";
import react from "@astrojs/react";

export default defineConfig({
  site: SITE_URL,

  integrations: [sitemap({
    filter: (page) => !isNoindexRoute(new URL(page).pathname),
  }), sanity({
    projectId: "zq58u9lx",
    dataset: "production",
    useCdn: process.env.NODE_ENV === "production",
    apiVersion: "2026-11-13",
    studioBasePath: "/studio",
  }), react()],

  fonts: [
    {
      name: "Inter",
      cssVariable: "--font-inter",
      provider: fontProviders.fontsource(),
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["latin"],
    },
    {
      name: "Geist Mono",
      cssVariable: "--font-mono",
      provider: fontProviders.fontsource(),
      weights: [400, 500],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["ui-monospace", "monospace"],
    },
  ],
  vite: { build: { cssTarget: "safari15.4" } },
  adapter: cloudflare(),
});