import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import withContainer from '../withContainer';
import SplashScreen from 'react-native-splash-screen';

const AppLoader = ({ navigation: { navigate } }) => {
  const getToken = async () => {
    // SplashScreen.hide();
    try {
      const token = await AsyncStorage.getItem('AUTH_TOKEN');
      if (token) {
        // navigate('MainApp');
        console.log('Logged In');
      } else navigate('SplashScreen');
    } catch (e) {
      // console.log('Error Reading Token');
    }
  };

  useEffect(() => {
    getToken();
  });
  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#83bb44" />
        <Text
          style={{ marginTop: 10, fontSize: 16, fontFamily: 'OpenSans-Bold' }}
        >
          Wait a Bit...
        </Text>
      </View>
    </>
  );
};
export default withContainer(AppLoader);
