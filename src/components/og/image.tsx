import type { CollectionEntry } from "astro:content";
import { formattedDate } from "../../util";

export default function (props: CollectionEntry<"blog">) {
  return (
    <div tw="flex flex-col w-full h-full pt-16 text-white bg-indigo-600">
      <div tw="flex flex-1 flex-col w-full h-full border-2 px-16 justify-between">
        <div tw="flex flex-col justify-center flex-1">
          <h1 tw="flex font-extrabold text-8xl">{props.data.title}</h1>
          <p tw="flex text-4xl tracking-tight mt-8">
            {props.data.description}
          </p>
        </div>
        <p tw="flex items-center text-3xl py-12">
          {formattedDate(new Date(props.data.pubDate))}
        </p>
      </div>
    </div>
  );
}
