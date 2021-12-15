import React, { useEffect } from "react";
import { auth } from "../lib/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser, makeNotification } from "../redux";
import { Navbar, SnackbarMaker } from "./index";
import styled from "styled-components";
import { getUserData } from "../lib/firestore/userData";
import { UseAllProductsData, UseCartData } from "../functions";

const StyledMain = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const StyledContentBox = styled.section`
  padding-top: 95px;
`;

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const setUserData = async () => {
          const userDataRes = await getUserData(user.providerData[0]);
          dispatch(setUser(userDataRes));
          dispatch(
            makeNotification({
              message: `Signed in as ${userDataRes?.email}`,
              variant: "success",
              duration: 2000,
            })
          );
        };
        setUserData();
      }
    });
    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    UseAllProductsData();
    UseCartData();
  }, []);

  return (
    <StyledMain>
      <Navbar />
      <StyledContentBox>{children}</StyledContentBox>
      {notification.message ? (
        <SnackbarMaker
          message={notification.message}
          variant={notification.variant}
          duration={notification.duration}
          times={notification.times}
        />
      ) : (
        ""
      )}
    </StyledMain>
  );
};

export default Layout;
