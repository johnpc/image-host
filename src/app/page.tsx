"use client";
import "@aws-amplify/ui-react/styles.css";
import { StorageManager } from "@aws-amplify/ui-react-storage";
import { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Button,
  Card,
  Link,
  Grid,
} from "@aws-amplify/ui-react";

import { Footer } from "./components/footer";
import { Header } from "./components/header";

import config from "../../amplifyconfiguration.json";
Amplify.configure(config);

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: any) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export default function Home() {
  const [href, setHref] = useState<string>("");
  const [uuid] = useState(uuidv4());
  const [copied, setCopied] = useState(false);
  const [imageKey, setImageKey] = useState<string>();
  useEffect(() => {
    setHref(window.location.href);
  }, []);

  const onUploadSuccess = (event: { key?: string }) => {
    setImageKey(event.key);
  };

  const imageUrl = `${href}${href.endsWith("/") ? "" : "/"}images/${imageKey}`;
  return (
    <>
      <Header />
      <StorageManager
        acceptedFileTypes={["image/*"]}
        accessLevel="guest"
        maxFileCount={1}
        onUploadSuccess={onUploadSuccess}
        path={`${uuid}-`}
        isResumable
      />
      {imageKey ? (
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
                href={`/images/${imageKey}`}
                borderStyle={"dotted"}
              >
                {imageUrl}
              </Link>
              <CopyToClipboard
                text={imageUrl}
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
