import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles';
import logo from '../images/shoey_logo.svg';

const { colors, navHeight } = theme;
const StyledNavbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${navHeight};
  z-index: 1000;
  background-color: ${colors.white};
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
  img {
    width: 200px;
  }
`;

const Navbar = () => {
  return (
    <StyledNavbar>
      <h1>.</h1>
      <img src={logo} alt="" />
      <h1>.</h1>
    </StyledNavbar>
  );
};

export default Navbar;
