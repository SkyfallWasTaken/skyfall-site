// @ts-check
import { defineConfig, envField } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@inox-tools/sitemap-ext";
import expressiveCode from "astro-expressive-code";
import webmanifest from "astro-webmanifest";

import vercel from "@astrojs/vercel";

import tailwindcss from '@tailwindcss/vite';

import { remarkAlert } from "remark-github-blockquote-alert";

import { SITE_DESCRIPTION, SITE_TITLE } from "./src/constants";

// https://astro.build/config
export default defineConfig({
  site: "https://mahadk.com",
  integrations: [
    expressiveCode({
      themes: ["catppuccin-macchiato", "catppuccin-latte"],
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

  vite: {
    plugins: [tailwindcss()]
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
