import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, List, ListItem, ListItemText, ListItemIcon, Avatar } from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Link, useHistory } from 'react-router-dom';
import { theme } from '../../styles';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { signoutUser } from '../../redux';
import { auth } from '../../lib/firebase';
import Icon from './Icon';
import { Pagelinks, category } from '../../utils';

const { colors, transition } = theme;

const CategoryContainer = styled.div`
  margin: 5px 10px;
  transition: 0.3s;
`;

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
        margin-left: 8px;
      }
    }
    svg {
      color: ${colors.grey2};
    }
  }
`;

const useStyles = makeStyles(() => ({
  category: {
    width: 300,
    marginTop: 10,
    transition: transition,
    position: 'relative',
    border: 'none',
  },
  categoryItems: {
    '& span': {
      fontSize: 16,
    },
  },
  categoryIcon: {
    width: '32px',
    height: '32px',
    overflow: 'hidden',
  },
  links: {
    margin: '30px 10px 0px',
  },
  linkIcon: {
    '& svg': {
      color: colors.black,
    },
  },
}));

const Sidebar = ({ open, setOpen }) => {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();
  const signout = () => {
    auth.signOut();
    dispatch(signoutUser());
    setOpen(false);
    history.push('/');
  };

  return (
    <SwipeableDrawer anchor="left" open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)}>
      <List className={classes.category}>
        {category.map((category, i) => (
          <CategoryContainer key={i}>
            <ListItem button onClick={() => setOpen(false)} component={Link} to={category.link}>
              <ListItemIcon className={classes.categoryIcon}>
                <Icon name={category.name} />
              </ListItemIcon>
              <ListItemText primary={category.name} className={classes.categoryItems} />
            </ListItem>
          </CategoryContainer>
        ))}
      </List>
      <Divider />
      <List className={classes.links}>
        {Pagelinks.map((link, i) => (
          <div key={i}>
            <ListItem component={Link} to={link.link} onClick={() => setOpen(false)} button>
              <ListItemIcon className={classes.linkIcon}>
                <Icon name={link.name} />
              </ListItemIcon>
              <ListItemText>{link.name}</ListItemText>
            </ListItem>
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
            <Icon name="Sign out" onClick={() => signout()} />
          </div>
        ) : (
          <p>
            Already a member?{' '}
            <Link to="/signin" onClick={() => setOpen(false)}>
              Sign in
            </Link>
          </p>
        )}
      </AuthContainer>
    </SwipeableDrawer>
  );
};

export default Sidebar;
