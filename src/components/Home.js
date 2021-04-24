import React, { useEffect } from 'react';
import { auth } from '../lib/firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user.providerData));
      } else {
        history.push('/signin');
      }
    });
    return unsubscribe;
  }, [dispatch, history]);
  return (
    <div>
      <h1>home</h1>
    </div>
  );
};

export default Home;
