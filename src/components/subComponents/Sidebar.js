import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, List, ListItem, ListItemText, ListItemIcon, Avatar } from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Link } from 'react-router-dom';
import { theme } from '../../styles';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { signoutUser } from '../../redux';
import { auth } from '../../lib/firebase';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const { colors, transition } = theme;

const AuthContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  padding: 5px 10px;
  border-top: 1px solid ${colors.blue};
  p {
    font-size: 16px;
  }
  .user__container {
    display: flex;
    justify-content: space-around;
    width: 100%;
    align-items: center;
    .user__details {
      display: flex;
      p {
        color: ${colors.textColor};
        font-size: 11px;
        font-weight: bold;
        margin-left: 4px;
      }
    }
  }
`;

const useStyles = makeStyles(() => ({
  list: {
    width: 300,
    marginTop: 10,
    transition: transition,
    position: 'relative',
  },
  categoryItems: {
    '& span': {
      fontSize: 16,
    },
  },
  heading: {
    textAlign: 'center',
    color: colors.blue,
  },
}));

const lists = [
  {
    name: 'Women',
  },
  {
    name: 'Men',
  },
  {
    name: 'Kids',
  },
];

const Sidebar = ({ open, setOpen }) => {
  const classes = useStyles();
  const user = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();
  const signout = () => {
    auth.signOut();
    dispatch(signoutUser());
    setOpen(false);
  };
  console.log(user.userDetails);
  return (
    <SwipeableDrawer anchor="left" open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)}>
      <List className={classes.list}>
        <h3 className={classes.heading}>Categories</h3>
        {lists.map((list, i) => (
          <div key={i}>
            <ListItem button onClick={() => setOpen(false)} component={Link} to={`/${list.name.toLowerCase()}`}>
              <ListItemText primary={list.name} className={classes.categoryItems} />
              <ListItemIcon>
                <ArrowForwardIosIcon />
              </ListItemIcon>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      <AuthContainer>
        {user?.uid ? (
          <div className="user__container">
            <div className="user__details">
              <Avatar src={user?.photoURL} alt={user?.email} />
              <p>{user?.email}</p>
            </div>
            <ExitToAppIcon style={{ color: colors.grey2 }} onClick={() => signout()} />
          </div>
        ) : (
          <p>
            Don't have a Account?{' '}
            <Link to="/signup" onClick={() => setOpen(false)}>
              Sign up
            </Link>
          </p>
        )}
      </AuthContainer>
    </SwipeableDrawer>
  );
};

export default Sidebar;
