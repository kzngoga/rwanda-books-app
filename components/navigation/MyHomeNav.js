// /* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import WithHeader from './WithHeader';
import HomeScreen from '../../views/HomeScreen';

function MyHomeNav({ navigation }) {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      let hist = navigation.dangerouslyGetState().history;
      const lastScr = hist[hist.length - 1];
      const check = lastScr.key.includes('Home');
      if (check) {
        navigation.navigate('Home', { screen: 'HomeScreen' });
      }
    });
    return unsubscribe;
  }, []);
  const HomeStack = createStackNavigator(
    {
      HomeScreen: {
        screen: WithHeader(HomeScreen),
      },
    },
    {
      initialRouteName: 'HomeScreen',
      headerMode: 'none',
    }
  );

  const HomeContainer = createAppContainer(HomeStack);

  return (
    <>
      <HomeContainer />
    </>
  );
}

export default MyHomeNav;
