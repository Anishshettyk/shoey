import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <Route
      {...rest}
      render={(props) => {
        return user.userDetails.uid ? <Redirect to="/" /> : <Component {...props} />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
