import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
 
const firebaseConfig = {

    apiKey: "AIzaSyBnWFeyh7mp3_8EAbnrTAbOiQUieVgkk7c",
  authDomain: "todo-2a6b8.firebaseapp.com",
  projectId: "todo-2a6b8",
  storageBucket: "todo-2a6b8.appspot.com",
  messagingSenderId: "201840269035",
  appId: "1:201840269035:web:afa4800746eaa66d3710ae"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
export const auth = getAuth(app);