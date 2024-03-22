export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { Amplify } from "aws-amplify";
import config from "../../../../amplifyconfiguration.json";
import { downloadData } from "aws-amplify/storage";
Amplify.configure(config);

export async function GET(
  req: Request,
  { params }: { params: { key: string } },
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
      ["Content-Type", "application/octet-stream"],
      ["Content-Disposition", `attachment; filename="${params.key}"`],
      ["Accept-Ranges", "bytes"],
      ["Cache-Control", "public, max-age=0"],
      ["Content-Length", `${blob.size}`],
    ],
  });

  return response;
}
