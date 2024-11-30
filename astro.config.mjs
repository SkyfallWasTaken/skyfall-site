// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import favicons from "astro-favicons";
import vercel from "@astrojs/vercel/serverless";

import { SITE_TITLE, SITE_DESCRIPTION } from "./src/constants";

// https://astro.build/config
export default defineConfig({
  site: "https://skyfall.dev",
  integrations: [
    tailwind(),
    sitemap(),
    favicons({
      masterPicture: "./src/img/rust.svg",
      emitAssets: true,
      appName: SITE_TITLE,
      appDescription: SITE_DESCRIPTION,
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
