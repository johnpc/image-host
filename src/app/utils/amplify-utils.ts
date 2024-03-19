import { cookies } from "next/headers";

import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";

import config from "../../../amplifyconfiguration.json";
import { type Schema } from "../../../amplify/data/resource";

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

export const cookiesClient = generateServerClientUsingCookies<Schema>({
  config,
  cookies,
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