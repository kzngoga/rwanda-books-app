import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const Loader = ({ marginTop, text }) => {
  return (
    <View style={{ alignItems: 'center', marginTop: marginTop }}>
      <ActivityIndicator color="#83bb44" size="large" />
      <Text style={{ marginTop: 10, color: '#83bb44' }}>{text}</Text>
    </View>
  );
};

export default Loader;
