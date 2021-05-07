import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.firestore();
export const userFinder = auth.currentUser;

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();

export const signup = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const googleAuth = () => {
  return auth.signInWithPopup(googleProvider);
};

export const githubAuth = () => {
  return auth.signInWithPopup(githubProvider);
};

export const signin = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const deleteUser = async () => {
  const user = auth.currentUser;
  if (user) {
    await user.delete();
  }
};

export default app;
