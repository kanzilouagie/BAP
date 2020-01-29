import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import Login from '../views/Login';
import SignUp from '../views/SignUp';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from '../authentication/Auth';
import ThreeCanvas from './ThreeCanvas';
import Detail from '../views/Detail';
import { StoreContext } from '../store/StoreProvider';
import { loadRunnersWorld } from '../three/runnersWorld';

const Router = () => {
  const store = useContext(StoreContext);

  useEffect(() => {
    if (!store.isWorldLoaded) {
      loadRunnersWorld(store);
      store.setIsWorldLoaded(true);
    }
  }, [store.isWorldLoaded]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <ThreeCanvas />
        <div style={{ position: 'relative', zIndex: '2' }}>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/detail/:id" component={Detail} />
          </Switch>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Router;
