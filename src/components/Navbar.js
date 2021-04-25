import React, { useState } from 'react';
import styled from 'styled-components';
import { theme, mixins } from '../styles';
import logo from '../images/shoey_logo.svg';
// import { Button } from '@material-ui/core';
import { Sidebar, TopNavbar } from './index';
import { Link } from 'react-router-dom';
import { Pagelinks, category } from '../utils';

// import DehazeIcon from '@material-ui/icons/Dehaze';

const { colors, navHeight, transitionTime } = theme;

const navLinks = [Pagelinks[0], ...category, Pagelinks[1], Pagelinks[3]];

const StyledNavbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: ${navHeight};
  z-index: 1000;
  background-color: ${colors.white};
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);

  .botton__navbar {
    ${mixins.spaceAround}
    justify-content: space-evenly;
    .navbar__logo {
      width: 100px;
      height: 100%;
    }
  }
`;
const NavLinkContainer = styled.div`
  ${mixins.flexCenter}

  a {
    margin: 0px 20px;
    color: ${colors.black};
    font-weight: 900;
    transition: ${transitionTime.t2};
    &:hover {
      color: ${colors.blue};
    }
  }
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <StyledNavbar>
      <TopNavbar />
      <div className="botton__navbar">
        <Link to="/">
          <img src={logo} alt="shoey logo" className="navbar__logo" />
        </Link>
        {/* <Button onClick={() => setOpen(true)}>
          <DehazeIcon />
        </Button> */}
        <NavLinkContainer>
          {navLinks.map((navLink, i) => (
            <Link to={navLink.link} key={i}>
              {navLink.name}
            </Link>
          ))}
        </NavLinkContainer>
        <Sidebar open={open} setOpen={setOpen} />

        <h1>.</h1>
      </div>
    </StyledNavbar>
  );
};

export default Navbar;
