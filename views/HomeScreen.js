import React from 'react';
import { View, Text } from 'react-native';

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#232323',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: '#343a40' }}>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
