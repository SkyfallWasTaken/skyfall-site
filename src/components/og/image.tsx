import { type CollectionEntry } from "astro:content";
import { formattedDate } from "../../util";

export default function (props: CollectionEntry<"blog">) {
  return (
    <div tw="flex flex-col w-full h-full pt-16 text-white bg-indigo-700">
      <div tw="flex flex-1 flex-col w-full h-full border-2 px-16 justify-center">
        <div tw="flex font-bold text-8xl mb-24">{props.data.title}</div>
        <div tw="flex text-4xl mb-8">{props.data.description}</div>
      </div>
      <div tw="flex px-16 items-center text-3xl mt-auto border-[1px] border-t-white py-12">
        {formattedDate(new Date(props.data.pubDate))}
      </div>
    </div>
  );
}
