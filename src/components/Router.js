import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import Login from '../views/Login';
import SignUp from '../views/SignUp';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from '../Authentication/Auth';

const Router = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Router;
