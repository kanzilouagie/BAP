/* eslint-disable react/prop-types */
import React from 'react';
import { useLocalStore } from 'mobx-react';
import { createContext } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    isOverviewLoaded: false,
    isProfileLoaded: false,
    setIsOverviewLoaded: bool => {
      store.isOverviewLoaded = bool;
    },
    setIsProfileLoaded: bool => {
      store.isProfileLoaded = bool;
    },
    resetLoadedScenes: () => {
      store.isOverviewLoaded = false;
      store.isProfileLoaded = false;
    },
    userInfo: {
      id: '',
      email: '',
      username: '',
      password: '',
      message: '',
      timestamp: ''
    },
    addUserInfo: (key, value) => {
      store.userInfo[key] = value;
    }
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
