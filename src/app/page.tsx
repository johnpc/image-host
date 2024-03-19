"use client";
import {StorageManager, StorageImage} from "@aws-amplify/ui-react-storage";
import {useState} from "react";
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import config from '../../amplifyconfiguration.json';
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
  const [uuid, setUuid] = useState(uuidv4());
  const [imageKey, setImageKey] = useState<string>();

  const onUploadSuccess = (event: {key?: string}) => {
    setImageKey(event.key);
  };

  return (
    <>
      <StorageManager
        acceptedFileTypes={["image/*"]}
        accessLevel="guest"
        maxFileCount={1}
        onUploadSuccess={onUploadSuccess}
        path={`${uuid}-`}
        isResumable
      />
      {imageKey ? <>
        <StorageImage alt={uuid} imgKey={imageKey} accessLevel="guest" />;
        <hr />
        <a href={`images/${imageKey}`}>Permalink: {imageKey}</a>
      </> : ''}
    </>
  );
}
