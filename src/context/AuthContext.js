import React, { useContext, useState, useEffect, createContext } from 'react';
import { auth, googleProvider, githubProvider } from '../lib/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const googleSignUp = () => {
    return auth.signInWithPopup(googleProvider);
  };

  const githubSignUp = () => {
    return auth.signInWithPopup(githubProvider);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = { signup, googleSignUp, githubSignUp, currentUser };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export default AuthProvider;
