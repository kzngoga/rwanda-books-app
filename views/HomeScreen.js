import React from 'react';
import { View, Text } from 'react-native';
import Icon from '../components/utilities/Icon';

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: '#343a40' }}>Home Screen</Text>
      <Icon name="home" color="#fff" width="512" height="300" />
    </View>
  );
};

export default HomeScreen;
