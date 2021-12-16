import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) => {
        return user.userDetails.uid ? <Component {...props} /> : <Redirect to="/" />;
      }}
    ></Route>
  );
};

export default UserRoute;
