import React, { useEffect } from 'react';
import { auth } from '../lib/firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux';
import Navbar from './Navbar';
import styled from 'styled-components';
import { theme } from '../styles';

const { navHeight } = theme;
const StyledContentBox = styled.section`
  margin: ${navHeight} 0px 0px;
`;

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
      <StyledContentBox>{children}</StyledContentBox>
    </main>
  );
};

export default Layout;
