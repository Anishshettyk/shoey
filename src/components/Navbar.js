import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { theme, mixins, media } from '../styles';
import logo from '../images/shoey_logo.svg';
import { Sidebar, TopNavbar, Icon } from './index';
import { Link, useHistory } from 'react-router-dom';
import { Pagelinks, category } from '../utils';
import {
  Badge,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  makeStyles,
  ListItemIcon,
  Avatar,
  Button,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../lib/firebase';
import { signoutUser, makeNotification } from '../redux';
import { useScrollDirection } from '../hooks';

import DehazeIcon from '@material-ui/icons/Dehaze';

const { colors, transitionTime } = theme;

export const navLinks = [Pagelinks[0], ...category, Pagelinks[1], Pagelinks[3]];

const StyledNavbar = styled.nav`
  position: fixed;
  width: 100%;
  z-index: 1000;
  background-color: ${colors.white};
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 15%), 0px 3px 4px 0px rgb(0 0 0 / 10%), 0px 1px 8px 0px rgb(0 0 0 / 8%);
  transition: all 0.2s ease-out 0s;
  ${(props) =>
    props.setScrollDirection === 'up' &&
    !props.scrollToTop &&
    css`
      transform: translateY(0px);
      opacity: 0.95;
    `};
  ${(props) =>
    props.setScrollDirection === 'down' &&
    !props.scrollToTop &&
    css`
      transform: translateY(calc(100% * -1));
    `};
  .botton__navbar {
    ${mixins.spaceAround}
    align-items: center;
    padding: 0px 10px;
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
  menuText: {
    color: colors.black,
  },
}));
const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: (props) => (props.user ? colors.green : colors.red),
    color: (props) => (props.user ? colors.green : colors.red),
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openAccount, setOpenAccount] = useState(null);
  const scrollDirection = useScrollDirection('down');
  const [scrollToTop, setScrollToTop] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.userDetails);

  const handleUserAccountClick = (event) => {
    setOpenAccount(event.currentTarget);
  };
  const handleUserAccountClose = () => {
    setOpenAccount(null);
  };

  const handleScroll = () => {
    setScrollToTop(window.pageYOffset < 10);
  };
  const signout = () => {
    auth.signOut();
    dispatch(signoutUser());
    history.push('/');
    handleUserAccountClose();
    dispatch(makeNotification({ message: `Signed out successfully`, variant: 'success' }));
  };

  const UserExistMenu = [
    { name: 'View profile', link: '/profile', iconName: 'User', func: handleUserAccountClose },
    { name: 'View cart', link: '/cart', iconName: 'Cart', func: handleUserAccountClose },
    { name: 'Wishlist', link: '/wishlist', iconName: 'heart', func: handleUserAccountClose },
    { name: 'Sign out', link: '/', iconName: 'Sign out', func: signout },
  ];
  const UserNotExistMenu = [
    { name: 'Sign in', link: '/signin', iconName: 'Sign in', func: handleUserAccountClose },
    { name: 'Sign up', link: '/signup', iconName: 'Sign up', func: handleUserAccountClose },
  ];
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <StyledNavbar setScrollDirection={scrollDirection} scrollToTop={scrollToTop}>
      <TopNavbar />
      <div className={'botton__navbar'}>
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
              {navLink?.name === 'Kids' ? (
                <Badge
                  badgeContent="new"
                  color="secondary"
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  className={classes.Badge}
                >
                  {navLink?.name}
                </Badge>
              ) : (
                navLink?.name
              )}
            </Link>
          ))}
        </NavLinkContainer>

        <div className={classes.NavOperationsContainer}>
          <Tooltip title={user?.uid ? `You signed in as ${user?.email}` : 'login or sign up'} aria-label="user account">
            <IconButton onClick={handleUserAccountClick}>
              <StyledBadge
                variant="dot"
                user={user?.uid}
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <Avatar src={user?.photoURL} alt={user?.email} />
              </StyledBadge>
            </IconButton>
          </Tooltip>
          <Menu anchorEl={openAccount} keepMounted open={Boolean(openAccount)} onClose={handleUserAccountClose}>
            {user?.uid
              ? UserExistMenu.map((menu, i) => (
                  <Link to={menu.link} key={i}>
                    <MenuItem onClick={() => menu.func()}>
                      <ListItemIcon>
                        <Icon name={menu.iconName} />
                      </ListItemIcon>
                      <ListItemText className={classes.menuText}>{menu.name}</ListItemText>
                    </MenuItem>
                  </Link>
                ))
              : UserNotExistMenu.map((menu, i) => (
                  <Link to={menu.link} key={i}>
                    <MenuItem onClick={() => menu.func()}>
                      <ListItemIcon>
                        <Icon name={menu.iconName} />
                      </ListItemIcon>
                      <ListItemText className={classes.menuText}>{menu.name}</ListItemText>
                    </MenuItem>
                  </Link>
                ))}
          </Menu>
          <Tooltip title="Search" aria-label="Search">
            <IconButton>
              <Icon name="Search" />
            </IconButton>
          </Tooltip>
          <Tooltip title="wishlist" aria-label="wishlist">
            <IconButton>
              <Badge badgeContent={user?.wishlist?.length > 0 ? user?.wishlist?.length : 0} color="secondary">
                <Icon name="heart" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="cart" aria-label="cart">
            <IconButton>
              <Badge badgeContent={1} color="primary">
                <Icon name="Cart" />
              </Badge>
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </StyledNavbar>
  );
};

export default Navbar;
