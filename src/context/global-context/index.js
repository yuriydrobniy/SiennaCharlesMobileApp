import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
// import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';
// import {MMKV} from 'react-native-mmkv';

// const storage = new MMKV();

export const GlobalContext = React.createContext();

export const GlobalContextProvider = props => {
  const [user, setUser] = useState(null); //either in async storage or null
  const [loading, setLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [trips, setTrips] = useState([]);
  const [remember, setRemember] = useState(true);
  const [morePdfs, setMorePdfs] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const response = await AsyncStorage.getItem('user');
      setUser(JSON.parse(response));
    }

    async function fetchTrips() {
      const response = await AsyncStorage.getItem('downloadedTrips');
      console.log('downloaded-pdfs', JSON.parse(response));
      setTrips(JSON.parse(response) ? JSON.parse(response) : []);
    }

    async function fetchMorePdfs() {
      const response = await AsyncStorage.getItem('downloadedMorePdfs');
      console.log('more-pdf-pdfs', JSON.parse(response));
      setMorePdfs(JSON.parse(response) ? JSON.parse(response) : []);
    }

    fetchUser();
    fetchMorePdfs();
    fetchTrips();
    // try {
    //   fetchMorePdfs();
    // } catch (error) {
    //   console.log('ERRORRR', error);
    // }
  }, []);

  useEffect(() => {
    downloadTrips(trips);
  }, [trips]);

  useEffect(() => {
    downloadMorePdfs(morePdfs);
  }, [morePdfs]);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      if (state.isInternetReachable !== null) {
        const offline = !(state.isConnected && state.isInternetReachable);
        setIsOffline(offline);
      }
    });

    return () => removeNetInfoSubscription();
  }, []);

  const handleLoading = flag => {
    setLoading(flag);
  };

  const setToastNotifications = notification => {
    Toast.show(notification.text); // Appearance: success, error, warning and info
  };

  const handleUser = activeUser => {
    if (remember) {
      AsyncStorage.setItem('user', JSON.stringify(activeUser));
    }
    setUser(activeUser);
  };

  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };

  const handleLogout = callback => {
    clearAsyncStorage();
    handleUser(null);
  };

  const internetStatus = status => {};

  const downloadTrips = trip => {
    AsyncStorage.setItem('downloadedTrips', JSON.stringify(trip));
  };

  const downloadMorePdfs = morePdf => {
    AsyncStorage.setItem('downloadedMorePdfs', JSON.stringify(morePdf));
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        loading,
        isOffline,
        trips,
        remember,
        morePdfs,
        setLoading: handleLoading,
        setUser: handleUser,
        setToastNotifications: setToastNotifications,
        clearAsyncStorage,
        handleLogout,
        setIsOffline,
        downloadTrips,
        setTrips,
        setRemember,
        setMorePdfs,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
