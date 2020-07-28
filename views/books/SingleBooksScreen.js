import React from 'react';
import { View, SafeAreaView, Text, Linking } from 'react-native';
import styled from 'styled-components';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '../../components/utilities/Icon';
import Img from '../../components/usage/Img';
import Btn from '../../components/utilities/CustomButton';
import NumberFormat from 'react-number-format';
import { useFocusEffect } from '@react-navigation/native';

const Books = ({ addScreen, navigation }) => {
  const { item } = navigation.state.params;
  useFocusEffect(
    React.useCallback(() => {
      addScreen('Read Book');
    }, [])
  );

  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#8c8c8c' }} />
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
        }}
      >
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Text>{item.bookTitle}</Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const Artist = styled.View`
  align-items: center;
  margin-top: 40px;
`;

export default Books;
