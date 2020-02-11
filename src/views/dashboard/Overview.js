import React, { useEffect, useContext } from 'react';
import SideNavigation from '../../components/SideNavigation';
import globals from '../../three/globals';
import { useHistory } from 'react-router';
import OverviewScene from '../../three/scenes/OverviewScene';
import { StoreContext } from '../../store/StoreProvider';

const Overview = () => {
  const store = useContext(StoreContext);
  const history = useHistory();
  globals.history = history;

  useEffect(() => {
    if (!store.isOverviewLoaded) {
      store.resetLoadedScenes();
      if (globals.currentScene) globals.currentScene.scene.dispose();
      globals.currentScene = new OverviewScene();
      store.setIsOverviewLoaded(true);
    }
  }, [store]);
  return (
    <>
      <h1>Overview</h1>
      <SideNavigation />
    </>
  );
};

export default Overview;
