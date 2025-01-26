import rss from "@astrojs/rss";
import type { APIContext } from "astro";

import { getCollection } from "astro:content";
import { SITE_DESCRIPTION, SITE_TITLE } from "../constants";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site as URL,
    items: posts.map((post) => ({
      ...post.data,
      link: `/posts/${post.id}`,
    })),
    customData: "<language>en-us</language>",
  });
}
