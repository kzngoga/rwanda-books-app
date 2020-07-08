import React, { useState, useEffect } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { Linking } from 'expo';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useLinking } from '@react-navigation/native';
import store from './redux/store';
import SplashScreen from './views/SplashScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
    'OpenSans-Light': require('./assets/fonts/OpenSans-Light.ttf'),
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Italic': require('./assets/fonts/OpenSans-Italic.ttf'),
  });
};

const AppNav = createStackNavigator();

function StackNav() {
  return (
    <AppNav.Navigator headerMode="none">
      <AppNav.Screen name="Splash" component={SplashScreen} />
    </AppNav.Navigator>
  );
}

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  const ref = React.useRef();

  const prefix = Linking.makeUrl('/');
  const { getInitialState } = useLinking(ref, {
    prefixes: [prefix],
  });

  useEffect(() => {
    // console.disableYellowBox = true;
    getInitialState()
      .catch(() => {})
      .then((state) => {
        if (state !== undefined) {
          setInitialState(state);
        }
        setIsReady(true);
      });
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Provider store={store}>
        <NavigationContainer initialState={initialState}>
          <StackNav />
        </NavigationContainer>
      </Provider>
      <SafeAreaView
        forceInset={{ top: 'never' }}
        style={{ backgroundColor: '#FFFFFF', flex: 0 }}
      />
    </>
  );
};

export default App;
