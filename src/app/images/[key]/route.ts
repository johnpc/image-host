export const dynamic = "force-dynamic";
import { Amplify } from "aws-amplify";
import config from "../../../../amplifyconfiguration.json";
import { downloadData } from "aws-amplify/storage";
import { NextResponse } from "next/server";
Amplify.configure(config);

export async function GET(
  req: Request,
  { params }: { params: { key: string } }
) {
  const { body } = await downloadData({
    key: params.key as string,
    options: {
      accessLevel: "guest",
    },
  }).result;
  const blob = await body.blob();

  const response = new NextResponse(blob, {
    status: 200,
    headers: [
      ["Content-Type", "image/png"],
      ["Accept-Ranges", "bytes"],
      ["Cache-Control", "public, max-age=0"],
      ["Content-Length", `${blob.size}`],
    ],
  });

  return response;
}
