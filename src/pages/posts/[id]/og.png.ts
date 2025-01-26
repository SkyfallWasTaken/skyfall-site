import fs from "node:fs/promises";
import { getCollection } from "astro:content";
import type { InferGetStaticParamsType } from "astro";
import satori from "satori";
import sharp from "sharp";

import OpenGraphImage from "@components/og/image";
import { cloneElement, type h, isValidElement } from "preact";
import { Children } from "preact/compat";
import { type TailwindConfig, tailwindToCSS } from "tw-to-css";

const posts = await getCollection("blog");
const { twj } = tailwindToCSS({
  config: (await import("@/../tailwind.config.mjs")).default as TailwindConfig,
});

type Params = InferGetStaticParamsType<typeof getStaticPaths>;

export async function GET({ params }: { params: Params }) {
  const post = posts.find((post) => post.id === params.id); // Find the specific post by ID
  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  const element = OpenGraphImage(post);
  const jsx = inlineTailwind(element);
  const png = await PNG(jsx);
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}

export async function getStaticPaths() {
  return posts.map((post) => ({
    params: { id: post.id },
    props: post,
  }));
}

function inlineTailwind(el: h.JSX.Element): h.JSX.Element {
  const { tw, children, style: originalStyle, ...props } = el.props;

  // Generate style from the `tw` prop
  const twStyle = tw ? twj(tw.split(" ")) : {};

  // Merge original and generated styles
  const mergedStyle = { ...originalStyle, ...twStyle };

  // Recursively process children
  const processedChildren = Children.map(children, (child) =>
    isValidElement(child) ? inlineTailwind(child as h.JSX.Element) : child,
  );

  // Return cloned element with updated props
  return cloneElement(el, { ...props, style: mergedStyle }, processedChildren);
}

export async function SVG(component: h.JSX.Element) {
  return await satori(component, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Outfit",
        data: await fs.readFile("./src/assets/fonts/og/Outfit-Regular.ttf"),
        weight: 400,
      },
      {
        name: "Outfit",
        data: await fs.readFile("./src/assets/fonts/og/Outfit-SemiBold.ttf"),
        weight: 600,
      },
    ],
  });
}

export async function PNG(component: h.JSX.Element) {
  return await sharp(Buffer.from(await SVG(component)))
    .png()
    .toBuffer();
}
