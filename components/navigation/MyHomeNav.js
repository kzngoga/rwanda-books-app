// /* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import WithHeader from './WithHeader';
import WithHomeHeader from './WithHomeHeader';
import HomeScreen from '../../views/HomeScreen';
import NewBooks from '../../views/books/NewBooks';
import PopularBooks from '../../views/books/PopularBooks';
import SingleBooksScreen from '../../views/books/SingleBooksScreen';
import MyWebView from '../../views/MyWebView';

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
        screen: WithHomeHeader(HomeScreen),
      },
      NewBooksScreen: {
        screen: WithHeader(NewBooks),
      },
      PopularBooksScreen: {
        screen: WithHeader(PopularBooks),
      },
      SingleBooksScreen: {
        screen: WithHeader(SingleBooksScreen),
      },
      MyWebView: {
        screen: WithHeader(MyWebView),
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
