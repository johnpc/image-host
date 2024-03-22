export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { contentType } from "mime-types";
import { Amplify } from "aws-amplify";
import config from "../../../../amplifyconfiguration.json";
import { downloadData, getProperties } from "aws-amplify/storage";
Amplify.configure(config);

export async function GET(
  req: Request,
  { params }: { params: { key: string } },
) {
  const properties = await getProperties({ key: params.key });
  console.log({ properties });

  const { body } = await downloadData({
    key: params.key as string,
    options: {
      accessLevel: "guest",
      onProgress: ({ transferredBytes, totalBytes }) => {
        console.log({
          transferredBytes,
          totalBytes,
        });
      },
    },
  }).result;
  const blob = await body.blob();
  const stream = await blob.stream();
  const contentTypeString =
    contentType(params.key) || "application/octet-stream";
  const headers: [string, string][] = [
    ["Content-Type", properties.contentType ?? contentTypeString],
    ["Accept-Ranges", "bytes"],
    ["Cache-Control", "public, max-age=0"],
    ["Content-Length", `${properties.size}`],
  ];

  if (contentTypeString.includes("octet-stream")) {
    headers.push([
      "Content-Disposition",
      `attachment; filename="${params.key}"`,
    ]);
  }

  const response = new NextResponse(stream, {
    status: 200,
    headers,
  });

  return response;
}
