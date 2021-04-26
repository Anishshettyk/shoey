import React, { useState } from 'react';
import styled from 'styled-components';
import { theme, mixins, media } from '../styles';
import logo from '../images/shoey_logo.svg';
import { Button } from '@material-ui/core';
import { Sidebar, TopNavbar, Icon } from './index';
import { Link } from 'react-router-dom';
import { Pagelinks, category } from '../utils';
import { Badge, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

import DehazeIcon from '@material-ui/icons/Dehaze';

const { colors, navHeight, transitionTime } = theme;

const navLinks = [Pagelinks[0], ...category, Pagelinks[1], Pagelinks[3]];

const StyledNavbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  max-height: ${navHeight};
  background-color: ${colors.white};
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 15%), 0px 3px 4px 0px rgb(0 0 0 / 10%), 0px 1px 8px 0px rgb(0 0 0 / 8%);

  .botton__navbar {
    ${mixins.spaceAround}
    align-items: center;
    padding: 20px 10px;
    .navbar__logo {
      width: 120px;
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
  ${media.tabletL`
  display:none;
`}
`;
const SidebarButton = styled(Button)`
  display: none;
  ${media.tabletL`
display:block;
`}
`;

const useStyles = makeStyles((theme) => ({
  NavOperationsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > *': {
      margin: '0px 5px',
      [theme.breakpoints.down('xs')]: {
        margin: '0px',
      },
    },
    '& svg': {
      fontSize: '25px',
      [theme.breakpoints.down('xs')]: {
        fontSize: '20px',
      },
    },
  },
  Badge: {
    padding: '3px',
  },
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  return (
    <StyledNavbar>
      <TopNavbar />
      <div className="botton__navbar">
        <SidebarButton onClick={() => setOpen(true)}>
          <DehazeIcon />
        </SidebarButton>

        <Sidebar open={open} setOpen={setOpen} />

        <Link to="/">
          <img src={logo} alt="shoey logo" className="navbar__logo" />
        </Link>

        <NavLinkContainer>
          {navLinks.map((navLink, i) => (
            <Link to={navLink.link} key={i}>
              {navLink.name === 'Kids' ? (
                <Badge
                  badgeContent="new"
                  color="secondary"
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  className={classes.Badge}
                >
                  {navLink.name}
                </Badge>
              ) : (
                navLink.name
              )}
            </Link>
          ))}
        </NavLinkContainer>

        <div className={classes.NavOperationsContainer}>
          <IconButton>
            <Icon name="Search" />
          </IconButton>
          <IconButton>
            <Icon name="User" />
          </IconButton>
          <IconButton>
            <Badge badgeContent={1} color="primary">
              <Icon name="Cart" />
            </Badge>
          </IconButton>
        </div>
      </div>
    </StyledNavbar>
  );
};

export default Navbar;
