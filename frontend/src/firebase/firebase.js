import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgH4Ci4YA9LtCGdeCh0R0kFTeAexO601c",
  authDomain: "iv-major-project.firebaseapp.com",
  projectId: "iv-major-project",
  storageBucket: "iv-major-project.appspot.com",
  messagingSenderId: "25190780853",
  appId: "1:25190780853:web:6f79bb30b3cb74c15853fc",
  measurementId: "G-S62TXBS91Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth, app};