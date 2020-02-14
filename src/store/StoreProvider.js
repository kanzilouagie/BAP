/* eslint-disable react/prop-types */
import React from 'react';
import { useLocalStore } from 'mobx-react';
import { createContext } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    isOverviewLoaded: false,
    isProfileLoaded: false,
    isOnboardingLoaded: false,
    setIsOnboardingLoaded: bool => {
      store.isOnboardingLoaded = bool;
    },
    isFirstTime: true,
    setIsFirstTime: bool => {
      store.isFirstTime = bool;
    },
    isIdleLoaded: false,
    setIsIdleLoaded: bool => {
      store.isIdleLoaded = bool;
    },
    setIsOverviewLoaded: bool => {
      store.isOverviewLoaded = bool;
    },
    setIsProfileLoaded: bool => {
      store.isProfileLoaded = bool;
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
