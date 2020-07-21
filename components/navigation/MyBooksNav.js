import React, { useEffect } from 'react';
import BooksScreen from '../../views/BooksScreen';
import { connect } from 'react-redux';
import { setCurrentScreen } from '../../redux/actions/navigation/navigation';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import WithHeader from './WithHeader';

function MyBooksNav({ navigation }) {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      let hist = navigation.dangerouslyGetState().history;
      const lastScr = hist[hist.length - 1];
      const check = lastScr.key.includes('Books');
      if (check) {
        navigation.navigate('Books', { screen: 'BooksScreen' });
      }
    });
    return unsubscribe;
  }, []);

  const BooksStack = createStackNavigator(
    {
      BooksScreen: {
        screen: WithHeader(BooksScreen),
      },
    },
    {
      initialRouteName: 'BooksScreen',
      headerMode: 'none',
    }
  );

  const BooksContainer = createAppContainer(BooksStack);

  return (
    <>
      <BooksContainer />
    </>
  );
}

const mapStateToProps = ({ nav }) => ({
  nav,
});

export default connect(null, { setCurrentScreen })(MyBooksNav);
