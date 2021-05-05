import React, { useEffect } from 'react';
import { auth } from '../lib/firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux';
import Navbar from './Navbar';
import styled from 'styled-components';
import { getUserData } from '../lib/firestore/userData';

const StyledContentBox = styled.section``;

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const setUserData = async () => {
          const userDataRes = await getUserData(user.providerData[0]);
          dispatch(setUser(userDataRes));
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
    </main>
  );
};

export default Layout;
