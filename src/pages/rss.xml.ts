import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

import { SITE_TITLE, SITE_DESCRIPTION } from '../constants';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
    const posts = await getCollection('blog');
    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: context.site!,
        items: posts.map((post) => ({
            ...post.data,
            link: `/posts/${post.id}`,
        })),
        customData: `<language>en-us</language>`,
    });
}