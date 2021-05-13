import React, { useEffect } from 'react';
import { auth } from '../lib/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, makeNotification } from '../redux';
import { Navbar, SnackbarMaker } from './index';
import styled from 'styled-components';
import { getUserData } from '../lib/firestore/userData';

const StyledContentBox = styled.section``;

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const setUserData = async () => {
          const userDataRes = await getUserData(user.providerData[0]);
          dispatch(setUser(userDataRes));
          dispatch(makeNotification({ message: `Signed in as ${userDataRes?.email}`, variant: 'success', duration: 4000 }));
        };
        setUserData();
      }
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <main>
      <Navbar />
      <StyledContentBox>{children}</StyledContentBox>
      {notification.message ? (
        <SnackbarMaker message={notification.message} variant={notification.variant} duration={notification.duration} />
      ) : (
        ''
      )}
    </main>
  );
};

export default Layout;
