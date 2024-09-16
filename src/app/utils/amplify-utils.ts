import { cookies } from "next/headers";

import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession } from "aws-amplify/auth/server";

import config from "../../../amplify_outputs.json";

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

export async function AuthGetCurrentSession() {
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => fetchAuthSession(contextSpec),
    });
    return currentUser;
  } catch (error) {
    console.error(error);
  }
}
