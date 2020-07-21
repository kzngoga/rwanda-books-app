import React, { useEffect } from 'react';
import SettingsScreen from '../../views/SettingsScreen';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import WithHeader from './WithHeader';

function SettingsNav({ navigation }) {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      let hist = navigation.dangerouslyGetState().history;
      const lastScr = hist[hist.length - 1];
      const check = lastScr.key.includes('Me');
      if (check) {
        navigation.navigate('Me', { screen: 'SettingsScreen' });
      }
    });
    return unsubscribe;
  }, []);
  const SettingsStack = createStackNavigator(
    {
      SettingsScreen: {
        screen: WithHeader(SettingsScreen),
      },
    },
    {
      initialRouteName: 'SettingsScreen',
      headerMode: 'none',
    }
  );

  const SettingsContainer = createAppContainer(SettingsStack);

  return (
    <>
      <SettingsContainer />
    </>
  );
}

export default connect(null, null)(SettingsNav);
