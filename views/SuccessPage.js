import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '../components/utilities/Icon';
import Logo from '../components/utilities/Logo';
import CustomButton from '../components/utilities/CustomButton';
import withContainer from '../withContainer';

const SuccessPage = ({ navigation: { navigate }, route }) => {
  const login = () => navigate('Login');
  const { type } = route.params;
  let title;
  let desc;
  if (type === 'signUp') {
    title = 'Verify Your Account';
    desc =
      'Your account was created successfully, now go to your email to verify this account!';
  } else {
    title = 'Pasword Reset Successfully';
    desc =
      'Your password was reset successfully, now go to your email to complete this process!';
  }

  return (
    <>
      <View style={styles.successContent}>
        <Logo marginTop={25} />
        <View style={styles.content}>
          <View style={{ marginTop: 45 }}>
            <Icon name="checkMark" width={70} height={70} />
          </View>
          <Text style={styles.successText}>{title}</Text>
          <Text style={styles.VerificationText}>{desc}</Text>
          <View style={{ flex: 1, position: 'absolute', top: 280 }}>
            <CustomButton
              text="Go To Login"
              color="#585858"
              marginTop={10}
              width={200}
              fontSize={16}
              padding={14}
              onPress={login}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  successContent: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#ffffff',
  },

  content: {
    flex: 1,
    alignItems: 'center',
  },

  successImg: {
    width: 164,
    height: 171,
    justifyContent: 'center',
  },

  successText: {
    marginTop: 28,
    fontSize: 28,
    fontFamily: 'OpenSans-Bold',
    color: '#343a40',
    textAlign: 'center',
    paddingHorizontal: 15,
    fontWeight: 'bold',
  },

  VerificationText: {
    marginTop: 20,
    fontSize: 14,
    color: '#6b6b6b',
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    fontWeight: '600',
    paddingHorizontal: 18,
  },
});

export default withContainer(SuccessPage);
