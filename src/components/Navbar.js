import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles';
import logo from '../images/shoey_logo.svg';
import { Button } from '@material-ui/core';
import { Sidebar, TopNavbar } from './index';
import { Link } from 'react-router-dom';

import DehazeIcon from '@material-ui/icons/Dehaze';

const { colors, navHeight } = theme;
const StyledNavbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${navHeight};
  z-index: 1000;
  background-color: ${colors.white};
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
  img {
    width: 130px;
    height: 100%;
  }
  .botton__navbar {
    display: flex;
    justify-content: space-between;
  }
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <StyledNavbar>
      <TopNavbar />
      <div className="botton__navbar">
        <Button onClick={() => setOpen(true)}>
          <DehazeIcon />
        </Button>
        <Sidebar open={open} setOpen={setOpen} />
        <Link to="/">
          <img src={logo} alt="shoey logo" />
        </Link>

        <h1>.</h1>
      </div>
    </StyledNavbar>
  );
};

export default Navbar;
