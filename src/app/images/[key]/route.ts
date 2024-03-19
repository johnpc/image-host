export const dynamic = "force-dynamic";
import { Amplify } from "aws-amplify";
import config from "../../../../amplifyconfiguration.json";
import { downloadData } from "aws-amplify/storage";
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
  return new Response(blob);
}
