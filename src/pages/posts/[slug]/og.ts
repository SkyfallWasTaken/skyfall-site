import fs from "fs/promises";
import satori from "satori";
import sharp from "sharp";
import { getCollection } from "astro:content";

import OpenGraphImage from "../../../components/og/image";

const posts = await getCollection("blog");

export async function GET({ params, request }) {
  const png = await PNG(
    OpenGraphImage({
      title: "How I made this blog",
    }),
  );
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}

export async function getStaticPaths() {
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post,
  }));
}

export async function SVG(component: JSX.Element) {
  return await satori(component, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Outfit",
        data: await fs.readFile("./src/assets/fonts/og/Outfit-SemiBold.ttf"),
        weight: 400,
      },
    ],
  });
}

export async function PNG(component: JSX.Element) {
  return await sharp(Buffer.from(await SVG(component)))
    .png()
    .toBuffer();
}
