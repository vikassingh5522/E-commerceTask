
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASQwwU7IaNo3Kza8kAUe8R4K6sl_zgfF0",
  authDomain: "my-shop-4d3e6.firebaseapp.com",
  projectId: "my-shop-4d3e6",
  storageBucket: "my-shop-4d3e6.firebasestorage.app", 
  //  storageBucket: "my-shop-4d3e6.appspot.com", 
  messagingSenderId: "141129309315",
  appId: "1:141129309315:web:0372344915d6c1118c8fb6",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
