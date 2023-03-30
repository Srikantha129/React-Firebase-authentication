
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBTKER0W78YeVpOysyhdrDM8kMGTYCfp6U",
  authDomain: "test1-358a6.firebaseapp.com",
  projectId: "test1-358a6",
  storageBucket: "test1-358a6.appspot.com",
  messagingSenderId: "1074805122331",
  appId: "1:1074805122331:web:be37ece3234c92d43d5fbe",
  measurementId: "G-1KT0KG38PR"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//const analytics = getAnalytics(app);