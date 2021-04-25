import React, { useEffect } from 'react';
import { auth } from '../lib/firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux';

const Home = () => {
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
    <div>
      <h1>home</h1>
    </div>
  );
};

export default Home;
