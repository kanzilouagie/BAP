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
