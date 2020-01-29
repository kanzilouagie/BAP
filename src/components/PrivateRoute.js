import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../authentication/Auth';
import { func } from 'prop-types';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={routeProps =>
        currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={'/login'} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: func.isRequired
};

export default PrivateRoute;
