import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, List, ListItem, ListItemText } from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
    marginTop: 40,
  },
  categoryItems: {
    fontWeight: 'bold',
  },
});

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
        {lists.map((list, i) => (
          <div key={i}>
            <ListItem button onClick={() => setOpen(false)} component={Link} to={`/${list.name.toLowerCase()}`}>
              <ListItemText primary={list.name} className={classes.categoryItems} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </SwipeableDrawer>
  );
};

export default Sidebar;
