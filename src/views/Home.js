import React, { useEffect, useContext } from 'react';
import app from '../authentication/base';
import { loadRunnersWorld, moveCamera } from '../three/runnersWorld';
import { StoreContext } from '../store/StoreProvider';
import { useObserver } from 'mobx-react';

const Home = () => {
  const store = useContext(StoreContext);

  useEffect(() => {
    if (!store.isWorldLoaded) {
      loadRunnersWorld(store);
      store.setIsWorldLoaded(true);
    }
  }, [store.isWorldLoaded]);

  return useObserver(() => (
    <>
      <h1>Home</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
      <>
        <button onClick={() => moveCamera('LEFT')}>Move left</button>
        <button onClick={() => moveCamera('RIGHT')}>Move right</button>
      </>
    </>
  ));
};

export default Home;
