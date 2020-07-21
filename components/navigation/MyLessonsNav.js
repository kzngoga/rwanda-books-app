// /* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import WithHeader from './WithHeader';
import LessonsScreen from '../../views/LessonsScreen';

function MyLessonsNav({ navigation }) {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      let hist = navigation.dangerouslyGetState().history;
      const lastScr = hist[hist.length - 1];
      const check = lastScr.key.includes('Lessons');
      if (check) {
        navigation.navigate('Lessons', { screen: 'LessonsScreen' });
      }
    });
    return unsubscribe;
  }, []);
  const LessonsStack = createStackNavigator(
    {
      LessonsScreen: {
        screen: WithHeader(LessonsScreen, 'no-back'),
      },
    },
    {
      initialRouteName: 'LessonsScreen',
      headerMode: 'none',
    }
  );

  const LessonsContainer = createAppContainer(LessonsStack);

  return (
    <>
      <LessonsContainer />
    </>
  );
}

export default connect(null, null)(MyLessonsNav);
