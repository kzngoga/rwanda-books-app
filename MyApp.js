import React from 'react';
import SplashScreen from './views/SplashScreen';
import AppLoader from './views/AppLoader';
import SignUp from './views/SignUp';
import SuccessPage from './views/SuccessPage';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { connect } from 'react-redux';

const MyApp = () => {
  const AppStack = createStackNavigator(
    {
      SplashScreen,
      AppLoader,
      SignUp,
      SuccessPage,
    },
    {
      initialRouteName: 'AppLoader',
      headerMode: 'none',
    }
  );
  const AppNavigator = createAppContainer(AppStack);

  return <AppNavigator />;
};

const mapStateToProps = ({ appNav }) => ({
  appNav,
});
export default connect(mapStateToProps, null)(MyApp);
