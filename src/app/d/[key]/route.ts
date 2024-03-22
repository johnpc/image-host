export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { Amplify } from "aws-amplify";
import config from "../../../../amplifyconfiguration.json";
import { getUrl } from "aws-amplify/storage";
Amplify.configure(config);

export async function GET(
  req: Request,
  { params }: { params: { key: string } },
) {
  const url = await getUrl({ key: params.key });
  console.log({ url });
  return NextResponse.redirect(url.url, { url: url.url.href });
}
