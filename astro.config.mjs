// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";
import webmanifest from "astro-webmanifest";

import { SITE_TITLE, SITE_DESCRIPTION } from "./src/constants";

// https://astro.build/config
export default defineConfig({
  site: "https://skyfall.dev",
  integrations: [
    tailwind(),
    sitemap(),
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
  },

  experimental: {
    env: {
      schema: {
        DISCORD_USER_ID: envField.string({
          context: "client",
          access: "public",
        }),
      },
    },
    serverIslands: true,
  },

  output: "hybrid",
  adapter: vercel(),
});
