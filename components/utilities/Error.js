import React from 'react';
import { View, Text } from 'react-native';
import Icon from './Icon';

const Loader = ({ marginTop, desc, title, icon }) => {
  return (
    <View style={{ alignItems: 'center', marginTop: marginTop }}>
      <Icon name={icon} width={30} height={30} color="#343a40" />
      <Text
        style={{
          marginTop: 2,
          color: '#343a40',
          fontFamily: 'OpenSans-Bold',
          fontWeight: 'bold',
          fontSize: 23,
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          marginTop: 2,
          color: '#8c8c8c',
          fontSize: 13,
          paddingHorizontal: 15,
          textAlign: 'center',
        }}
      >
        {desc}
      </Text>
    </View>
  );
};

export default Loader;
