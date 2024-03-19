import { defineStorage } from "@aws-amplify/backend";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";

export const storage = defineStorage({
  name: "imageHost",
  access: ({authenticated, guest}) => ({
    '/*': [authenticated.to(['read', 'write']), guest.to(['read', 'write'])],
  }),
});
