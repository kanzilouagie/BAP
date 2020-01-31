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
    setUserId: id => {
      store.userInfo.id = id;
    },
    setUserEmail: email => {
      store.userInfo.email = email;
    },
    setUserUsername: username => {
      store.userInfo.username = username;
    },
    setUserPassword: password => {
      store.userInfo.password = password;
    },
    setUserMessage: message => {
      store.userInfo.message = message;
    },
    setUserTimestamp: timestamp => {
      store.userInfo.timestamp = timestamp;
    }
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
