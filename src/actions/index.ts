import { ActionError, defineAction } from "astro:actions";
import { DISCORD_USER_ID } from "astro:env/client";
import { fetchUserData as fetchLanyardUserData } from "lanyard-wrapper";

export const server = {
  discord: {
    profile: defineAction({
      // important to be "json" in this case because it's not being called from a form submit.
      accept: "json",
      handler: async (_) => {
        try {
          const data = await fetchLanyardUserData(DISCORD_USER_ID);
          return data;
        } catch {
          throw new ActionError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error fetching data from Lanyard",
          });
        }
      },
    }),
  },
};
