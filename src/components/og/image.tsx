import { type CollectionEntry } from "astro:content";
import { formattedDate } from "../../util";

export default function (props: CollectionEntry<"blog">) {
  return (
    <div tw="flex flex-col w-full h-full p-12 items-center text-center justify-center text-text bg-base">
      <div tw="flex font-bold text-8xl mb-4">{props.data.title}</div>
      <div tw="flex text-5xl mb-12">{props.data.description}</div>
      <div tw="flex text-3xl">
        {formattedDate(new Date(props.data.pubDate))}
      </div>
    </div>
  );
}
