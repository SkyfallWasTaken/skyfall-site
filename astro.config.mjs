// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import cloudflare from '@astrojs/cloudflare';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://skyfall.dev',
  integrations: [tailwind(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'catppuccin-macchiato',
        dark: 'catppuccin-macchiato',
      },
    },
  },

  experimental: {
    env: {
      schema: {
        DISCORD_USER_ID: envField.string({ context: "client", access: "public" }),
      }
    },
    serverIslands: true,
  },

  output: "hybrid",
  adapter: cloudflare()
});