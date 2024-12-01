import { type CollectionEntry } from "astro:content";
import { formattedDate } from "../../util";

export default function (props: CollectionEntry<"blog">) {
  return (
    <div tw="flex flex-col w-full h-full pt-16 text-white bg-indigo-700">
      <div tw="flex flex-1 flex-col w-full h-full border-2 px-16 justify-between">
        <div tw="flex flex-col justify-center flex-1">
          <div tw="flex font-bold text-8xl">{props.data.title}</div>
          <div tw="flex text-4xl mt-8">{props.data.description}</div>
        </div>
        <div tw="flex items-center text-3xl py-12">
          {formattedDate(new Date(props.data.pubDate))}
        </div>
      </div>
    </div>
  );
}
