import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Link } from 'react-router-dom';
import { theme } from '../../styles';
import styled from 'styled-components';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const { colors, transition } = theme;

const AuthContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  padding: 5px 10px;
  border-top: 2px solid ${colors.lightBlue};
  p {
    font-size: 16px;
  }
`;

const useStyles = makeStyles((theme) => ({
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
        <Divider />
        <p>
          Don't have a Account?{' '}
          <Link to="/signup" onClick={() => setOpen(false)}>
            Sign up
          </Link>
        </p>
      </AuthContainer>
    </SwipeableDrawer>
  );
};

export default Sidebar;
