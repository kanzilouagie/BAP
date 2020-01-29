/* eslint-disable react/prop-types */
import React from 'react';
import { useLocalStore } from 'mobx-react';
import { createContext } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    isWorldLoaded: false,
    setIsWorldLoaded: bool => {
      store.isWorldLoaded = bool;
    }
  }));
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
