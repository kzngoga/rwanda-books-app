// /* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';

import SearchScreen from '../../views/SearchScreen';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import WithHeader from './WithHeader';

function MySearchNav({ navigation, link }) {
  // useEffect(() => {
  //   if (link.deepLink) navigation.navigate('Home');
  // }, [link]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      let hist = navigation.dangerouslyGetState().history;
      const lastScr = hist[hist.length - 1];
      const check = lastScr.key.includes('Search');
      if (check) {
        navigation.navigate('Search', { screen: 'SearchScreen' });
      }
    });
    return unsubscribe;
  }, []);
  const SearchStack = createStackNavigator(
    {
      SearchScreen: {
        screen: WithHeader(SearchScreen),
      },
    },
    {
      initialRouteName: 'SearchScreen',
      headerMode: 'none',
    }
  );

  const SearchContainer = createAppContainer(SearchStack);

  return (
    <>
      <SearchContainer />
    </>
  );
}

const mapStateToProps = ({ link }) => ({
  link,
});

export default connect(mapStateToProps, null)(MySearchNav);
