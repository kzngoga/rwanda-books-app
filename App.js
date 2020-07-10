import React, { useState } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import store from './redux/store';
import MyApp from './MyApp';

const fetchFonts = () => {
  return Font.loadAsync({
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
    'OpenSans-Light': require('./assets/fonts/OpenSans-Light.ttf'),
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Italic': require('./assets/fonts/OpenSans-Italic.ttf'),
  });
};

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);

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
        <MyApp />
      </Provider>
      <SafeAreaView
        forceInset={{ top: 'never' }}
        style={{ backgroundColor: '#FFFFFF', flex: 0 }}
      />
    </>
  );
};

export default App;
