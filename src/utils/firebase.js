import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import {
  api_key,
  app_id,
  auth_domain,
  messaging_sender_id,
  project_id,
  storage_buckey,
} from "./config";

const firebaseConfig = {
  apiKey: api_key,
  authDomain: auth_domain,
  projectId: project_id,
  storageBucket: storage_buckey,
  messagingSenderId: messaging_sender_id,
  appId: app_id,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
