import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated, permission } = useSelector((state) => ({
    isAuthenticated: state.user.isAuthenticated,
    permission: state.user.permission,
  }));

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated && permission !== 'free' ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/account',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
