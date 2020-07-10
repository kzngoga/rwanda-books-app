import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text, BackHandler } from 'react-native';
import withContainer from '../withContainer';
import Btn from '../components/utilities/CustomButton';
import styled from 'styled-components';

const SplashScreen = ({ navigation: { navigate } }) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () =>
      BackHandler.exitApp()
    );
    return () => {
      BackHandler.removeEventListener('hardwareBackPress');
    };
  }, []);

  const login = () => {
    requestAnimationFrame(() => {
      navigate('Login');
    });
  };

  const signUp = () => {
    requestAnimationFrame(() => {
      navigate('SignUp');
    });
  };
  return (
    <>
      <SplashContainer>
        <Logo>
          <Image
            style={{ width: 400, height: 100 }}
            source={require('../assets/images/splashLogo.png')}
          />
        </Logo>
        <View
          style={{ paddingHorizontal: 15, marginBottom: 30, marginTop: 40 }}
        >
          <Image
            style={{ width: 330, height: 180 }}
            source={require('../assets/images/hero-bg.jpg')}
          />
        </View>
        <WelcomeTxt>
          <WelcomeTitle>Welcome!</WelcomeTitle>
          <Text
            style={{
              color: '#6b6b6b',
              fontStyle: 'italic',
              textAlign: 'center',
              marginTop: 15,
              paddingHorizontal: 20,
            }}
          >
            Create your free account here or login to enjoy different features
            offered by 'Rwanda-Books'!
          </Text>
        </WelcomeTxt>
        <View style={{ flex: 3, marginTop: 35 }}>
          <View
            style={{
              paddingHorizontal: 10,
              alignItems: 'center',
            }}
          >
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
              <Btn
                style={{ flex: 3 }}
                marginRight={10}
                width={150}
                fontSize={15}
                text="Login"
                color="#83bb44"
                marginTop={5}
                padding={12}
                onPress={login}
              />
              <Btn
                style={{ flex: 3 }}
                width={150}
                fontSize={15}
                text="Sign Up"
                color="#21305f"
                padding={12}
                marginTop={5}
                onPress={signUp}
              />
            </View>
          </View>
        </View>
      </SplashContainer>
    </>
  );
};

const SplashContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

const Logo = styled.View`
  flex: 1;
  align-items: center;
  padding: 10px;
  margin-top: 50px;
`;

const WelcomeTxt = styled.View`
  flex: 1;
  align-items: center;
`;

const WelcomeTitle = styled.Text`
  font-weight: bold;
  font-size: 40px;
  color: #343a40;
`;

const BtnStyle = styled.View`
  margin: 10px;
  align-items: center;
`;

export default withContainer(SplashScreen);
