import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// console.log(process.env.REACT_APP_FIREPABE_API_KEY)
const app = initializeApp({
    apiKey: process.env.REACT_APP_FIREPABE_API_KEY,
    authDomain: process.env.REACT_APP_FIREPABE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREPABE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREPABE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREPABE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREPABE_APP_ID
  });

export const auth = getAuth(app)
export default app;