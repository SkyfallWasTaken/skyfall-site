import { getWebring } from "@/util";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const { url } = context;
  const webring = await getWebring(url);
  return new Response(JSON.stringify(webring), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
