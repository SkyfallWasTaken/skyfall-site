import fs from "fs/promises";
import satori from "satori";
import sharp from "sharp";
import { getCollection } from "astro:content";
import type { InferGetStaticParamsType } from "astro";

import OpenGraphImage from "../../../components/og/image";
import { tailwindToCSS, type TailwindConfig } from "tw-to-css";
import { cloneElement, isValidElement, type h } from "preact";
import { Children } from "preact/compat";

const posts = await getCollection("blog");
const { twj } = tailwindToCSS({
  config: (await import("../../../../tailwind.config.mjs"))
    .default as TailwindConfig,
});

type Params = InferGetStaticParamsType<typeof getStaticPaths>;

export async function GET({ params }: { params: Params }) {
  const post = posts.find((post) => post.slug === params.slug); // Find the specific post by slug
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
    params: { slug: post.slug },
    props: post,
  }));
}

function inlineTailwind(el: h.JSX.Element): h.JSX.Element {
  const { tw, children, ...props } = el.props;
  let style: h.JSX.Element["props"]["style"] = {};

  if (tw) {
    style = twj(tw.split(" "));
  }

  return cloneElement(
    el,
    { ...props, style },
    Children.map(children, (child) =>
      isValidElement(child) ? inlineTailwind(child) : child,
    ),
  );
}

export async function SVG(component: JSX.Element) {
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

export async function PNG(component: JSX.Element) {
  return await sharp(Buffer.from(await SVG(component)))
    .png()
    .toBuffer();
}
