"use client";
import "@aws-amplify/ui-react/styles.css";
import { StorageManager } from "@aws-amplify/ui-react-storage";
import { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, Card, Link, Grid } from "@aws-amplify/ui-react";

import { Footer } from "./components/footer";
import { Header } from "./components/header";

import config from "../../amplify_outputs.json";
Amplify.configure(config);

const makeHash = (length: number): string => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export default function Home() {
  const [href, setHref] = useState<string>("");
  const [uuid] = useState(makeHash(5));
  const [copied, setCopied] = useState(false);
  const [fileKey, setFileKey] = useState<string>();
  useEffect(() => {
    setHref(window.location.href);
  }, []);

  const onUploadSuccess = (event: { key?: string }) => {
    setFileKey(encodeURI(event.key!.substring("public/".length)));
  };
  const onUploadError = (event: any) => {
    console.log(event);
  };

  const fileUrl = `${href}${href.endsWith("/") ? "" : "/"}d/${fileKey}`;
  return (
    <>
      <Header />
      <StorageManager
        acceptedFileTypes={["*"]}
        accessLevel="guest"
        maxFileCount={1}
        onUploadSuccess={onUploadSuccess}
        onUploadError={onUploadError}
        path={`public/${uuid}-`}
        isResumable
      />
      {fileKey ? (
        <>
          <Card variation="outlined" textAlign={"center"}>
            <Grid
              columnGap="0.5rem"
              rowGap="0.5rem"
              templateColumns={{ base: "1fr", large: "1fr 1fr" }}
              templateRows={{ base: "1fr 1fr", large: "1fr" }}
            >
              <Link
                padding={"10px"}
                width={"100%"}
                margin={"auto"}
                textAlign={"center"}
                href={`/d/${fileKey}`}
                borderStyle={"dotted"}
              >
                {fileUrl}
              </Link>
              <CopyToClipboard
                text={fileUrl}
                onCopy={() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1000);
                }}
              >
                <Button colorTheme={copied ? "success" : undefined}>
                  {copied ? "✅" : "Copy to Clipboard"}
                </Button>
              </CopyToClipboard>
            </Grid>
          </Card>
        </>
      ) : (
        ""
      )}
      <Footer />
    </>
  );
}
