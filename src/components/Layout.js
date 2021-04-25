import React, { useEffect } from 'react';
import { auth } from '../lib/firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user.providerData));
      }
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <main>
      <Navbar />
      <div>{children}</div>
    </main>
  );
};

export default Layout;
