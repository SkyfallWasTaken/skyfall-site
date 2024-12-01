// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import webmanifest from "astro-webmanifest";
import mdx from "@astrojs/mdx"

import vercel from "@astrojs/vercel/serverless";

import { SITE_TITLE, SITE_DESCRIPTION } from "./src/constants";

import sentry from "@sentry/astro";

// FIXME: massive hack, but we can't get content collections inside the config file.
// we probably need to write a script to generate this list.
const drafts = ["astro-og-with-satori"];

// https://astro.build/config
export default defineConfig({
  site: "https://skyfall.dev",
  integrations: [
    tailwind(),
    mdx(),
    sitemap({
      filter: (page) => {
        for (const draft of drafts) {
          if (page.includes(draft)) {
            return false;
          }
        }
        return true;
      },
    }),
    webmanifest({
      name: SITE_TITLE,
      icon: "public/favicon.png", // source for favicon & icons

      short_name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      start_url: "/",
      theme_color: "#cba6f7", // mocha mauve
      background_color: "#1e1e2e", // mocha base
      display: "standalone",
    }),
    process.env.SENTRY_AUTH_TOKEN != undefined &&
    sentry({
      dsn: process.env.SENTRY_DSN,
      sourceMapsUploadOptions: {
        project: process.env.SENTRY_PROJECT_NAME,
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
  ],

  markdown: {
    shikiConfig: {
      themes: {
        light: "catppuccin-macchiato",
        dark: "catppuccin-macchiato",
      },
    },
  },

  experimental: {
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
          context: "client",
          access: "public",
          optional: true,
        }),
      },
    },
    serverIslands: true,
  },

  output: "hybrid",
  adapter: vercel(),
});
