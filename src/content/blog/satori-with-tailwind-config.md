---
title: "How to use Satori with your Tailwind config"
description: "A quick guide to using Satori with your Tailwind plugins, fonts, and everything else in your config!"
tags: ["satori", "tailwind"]
pubDate: "November 30, 2024 21:00"
---

## Introduction

[Satori](https://github.com/vercel/satori) is an easy to use library that lets you generate an SVG file using React (or Preact)! In my opinion, it's _the_ nicest way to generate images.

Satori also comes with Tailwind support by default, but there's a catch - it doesn't work with your Tailwind config out-of-the-box. In this blog post, I'll be showing you how to get Satori to work with your Tailwind config!

## Step 1: Dependencies

We'll first need to download the dependencies we need. I'll be using Preact in this tutorial, but React works too (albeit with a few minor changes in the imports and types)

```bash
npm install preact # or `npm install react`
npm install satori
```

We'll also need the `tw-to-css` library, which'll convert our Tailwind classes into a `style` prop that Satori can render.

```bash
npm install tw-to-css
```

## The Code

First, let's import the things we'll be using:

```ts
import { tailwindToCSS, type TailwindConfig } from "tw-to-css";
import { cloneElement, isValidElement, type h } from "preact";
import { Children } from "preact/compat";
```

We then need to get a `twj` function (Tailwind to JSON); we'll use it to convert our Tailwind classes into an object of inline styles that the `style` prop will use:

```ts
const { twj } = tailwindToCSS({
  config: (await import("../tailwind.config.mjs")).default as TailwindConfig,
});
```

Make sure to replace the path above with the path to your Tailwind config!

Now, let's define an `inlineTailwind` function that'll convert the Tailwind classes into inline styles:

```ts
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
```

And you're done! Here's an example of how you can use this function:

```tsx
function Component() {
  return <div tw="flex bg-base">Hi there! 👋</div>;
}

const element = Component();
const jsx = inlineTailwind(element);
const svg = await satori(jsx, {
  width: 1200,
  height: 630,
  // ... any other satori options
});
```

_Thanks to [this issue on GitHub](https://github.com/vercel/satori/discussions/529) for parts of the code!_
