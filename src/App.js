import {View, StatusBar, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Login from './screens/login';
import Dashboard from './screens/dashboard';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Detail from './screens/detail';
import {GlobalContext, GlobalContextProvider} from './context/global-context';
import Loader from './components/loader';
import NoInternet from './screens/no-internet';

const Stack = createNativeStackNavigator();

// const NoInternetStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name="NO_INTERNET_SCREEN" component={NoInternet} />
//     </Stack.Navigator>
//   );
// };

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LOGIN_SCREEN" component={Login} />
    </Stack.Navigator>
  );
};

const GeneralStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DASHBOARD_SCREEN" component={Dashboard} />
      <Stack.Screen name="DETAILS_SCREEN" component={Detail} />
    </Stack.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <GlobalContextProvider>
      <GlobalContext.Consumer>
        {globalContext => (
          <NavigationContainer>
            <StatusBar barStyle="light-content" />
            {!globalContext.user ? (
              <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="AuthStack" component={AuthStack} />
              </Stack.Navigator>
            ) : (
              <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="GeneralStack" component={GeneralStack} />
              </Stack.Navigator>
            )}

            {globalContext.loading && <Loader />}
          </NavigationContainer>
        )}
      </GlobalContext.Consumer>
    </GlobalContextProvider>
  );
};

export default App;
