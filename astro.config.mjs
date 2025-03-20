// @ts-check
import { defineConfig, envField } from "astro/config";

import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@inox-tools/sitemap-ext";
import webmanifest from "astro-webmanifest";
import expressiveCode from "astro-expressive-code";

import vercel from "@astrojs/vercel";

import { remarkAlert } from "remark-github-blockquote-alert";

import { SITE_DESCRIPTION, SITE_TITLE } from "./src/constants";

// https://astro.build/config
export default defineConfig({
  site: "https://skyfall.dev",
  integrations: [
    tailwind(),
    expressiveCode({
      themes: ['catppuccin-macchiato', 'catppuccin-latte'],
    }),
    mdx(),
    sitemap({
      includeByDefault: true,
    }),
    webmanifest({
      name: SITE_TITLE,
      icon: "src/assets/img/favicon.png", // source for favicon & icons

      short_name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      start_url: "/",
      theme_color: "#cba6f7", // mocha mauve
      background_color: "#1e1e2e", // mocha base
      display: "standalone",
    }),
  ],

  markdown: {
    shikiConfig: {
      themes: {
        light: "catppuccin-macchiato",
        dark: "catppuccin-macchiato",
      },
    },
    remarkPlugins: [remarkAlert],
  },

  env: {
    schema: {
      DISCORD_USER_ID: envField.string({
        context: "client",
        access: "public",
      }),
      UMAMI_SCRIPT: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      UMAMI_WEBSITE_ID: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      SENTRY_DSN: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      SENTRY_PROJECT_NAME: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      SENTRY_AUTH_TOKEN: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
    },
  },

  adapter: vercel(),
});
