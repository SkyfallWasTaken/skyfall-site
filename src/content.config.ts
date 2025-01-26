import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      tags: z.array(z.string()),
      image: image().optional(),
      draft: z.boolean().default(false),
    }),
});
const projectsCollection = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tagline: z.string(),
      url: z.string().url(),
      mainImage: image(),
      smallTileImage: image().optional(),
      pinned: z.boolean().default(false),
      tools: z.array(z.string()),
    }),
});

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
};
