import React, { useContext, useEffect } from 'react';
import SideNavigation from '../../components/SideNavigation';
import globals from '../../three/globals';
import ProfileScene from '../../three/scenes/ProfileScene';
import { StoreContext } from '../../store/StoreProvider';

const Looks = () => {
  const store = useContext(StoreContext);

  useEffect(() => {
    if (!store.isProfileLoaded) {
      store.resetLoadedScenes();
      globals.currentScene.remove();
      globals.currentScene = new ProfileScene();
      store.setIsProfileLoaded(true);
    }
  }, [store]);
  return (
    <>
      <h1>Looks</h1>
      <SideNavigation />
    </>
  );
};

export default Looks;
