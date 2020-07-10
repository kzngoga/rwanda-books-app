import React from 'react';
import SplashScreen from './views/SplashScreen';
import AppLoader from './views/AppLoader';
import SignUp from './views/SignUp';
import Login from './views/Login';
import SuccessPage from './views/SuccessPage';
import MainApp from './views/MainNav';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { connect } from 'react-redux';

const MyApp = () => {
  const AppStack = createStackNavigator(
    {
      SplashScreen,
      AppLoader,
      Login,
      SignUp,
      SuccessPage,
      MainApp,
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
