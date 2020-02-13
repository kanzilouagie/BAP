import React, { useEffect, useContext } from 'react';
import SideNavigation from '../../components/SideNavigation';
import globals from '../../three/globals';
import { useHistory } from 'react-router';
import OverviewScene from '../../three/scenes/OverviewScene';
import { StoreContext } from '../../store/StoreProvider';
import gsap from 'gsap';

const Overview = () => {
  const store = useContext(StoreContext);
  const history = useHistory();
  globals.history = history;

  useEffect(() => {
    if (!store.isOverviewLoaded) {
      gsap.to(globals.camera.rotation, 0.25, { x: -1 });
      setTimeout(() => {
        globals.currentScene = new OverviewScene();
      }, 250);
      store.setIsOverviewLoaded(true);
    }
  }, [store]);

  useEffect(() => {
    return () => {
      if (history.location.pathname !== '/detail') {
        store.setIsOverviewLoaded(false);
        globals.currentScene.scene.dispose();
      }
    };
  }, [history]);
  return (
    <>
      <h1>Overview</h1>
      <SideNavigation />
    </>
  );
};

export default Overview;
