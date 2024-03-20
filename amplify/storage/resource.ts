import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "imageHost",
  access: ({ authenticated, guest }) => ({
    "/*": [authenticated.to(["read", "write"]), guest.to(["read", "write"])],
  }),
});
