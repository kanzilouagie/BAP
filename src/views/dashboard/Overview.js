import React, { useEffect, useContext } from 'react';
import SideNavigation from '../../components/SideNavigation';
import { useHistory } from 'react-router';
import globals from '../../three/globals';
import loadThree from '../../three/setup';
import { StoreContext } from '../../store/StoreProvider';

const Overview = () => {
  // pass history to threejs scene
  const history = useHistory();
  globals.history = history;

  const store = useContext(StoreContext);

  useEffect(() => {
    if (!store.isWorldLoaded) {
      loadThree();
      store.setIsWorldLoaded(true);
    }
  }, [store]);
  return (
    <>
      <SideNavigation />
    </>
  );
};

export default Overview;
