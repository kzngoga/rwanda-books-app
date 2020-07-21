import React from 'react';
import styled from 'styled-components';
import { View, TouchableOpacity } from 'react-native';
import Icon from '../utilities/Icon';

const AppHeader = ({ navigation, screens, popScreen, noBack }) => {
  const handleBackBtn = () => {
    requestAnimationFrame(() => {
      popScreen();
      navigation.pop();
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 3 },
        elevation: 10,
      }}
    >
      {!noBack ? (
        <TouchableOpacity
          onPress={handleBackBtn}
          style={{
            position: 'absolute',
            top: 0,
            left: 5,
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="back" width={17} height={15} color="#343a40" />
        </TouchableOpacity>
      ) : null}
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Title>{screens[screens.length - 1]}</Title>
      </View>
    </View>
  );
};

const Title = styled.Text`
  color: #343a40;
  font-size: 16px;
  font-family: 'OpenSans-SemiBold';
`;

export default AppHeader;
