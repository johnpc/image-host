import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { storage } from "./storage/resource";

const backend = defineBackend({
  auth,
  storage,
});

const { cfnBucket } = backend.storage.resources.cfnResources;
cfnBucket.accelerateConfiguration = {
  accelerationStatus: "Enabled",
};
