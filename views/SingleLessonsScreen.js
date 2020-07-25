import React from 'react';
import { View, SafeAreaView, Text, Linking } from 'react-native';
import styled from 'styled-components';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '../components/utilities/Icon';
import Img from '../components/usage/Img';
import Btn from '../components/utilities/CustomButton';
import NumberFormat from 'react-number-format';
import { useFocusEffect } from '@react-navigation/native';

const LessonsScreen = ({ addScreen, navigation }) => {
  const { item } = navigation.state.params;
  useFocusEffect(
    React.useCallback(() => {
      addScreen('View Lesson');
    }, [])
  );

  const RnNumberFormat = (value) => {
    return (
      <NumberFormat
        value={value}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'RWF'}
        renderText={(formattedValue) => (
          <Text style={{ fontFamily: 'OpenSans-Regular', color: '#343a40' }}>
            {formattedValue}
          </Text>
        )}
      />
    );
  };

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
          <View>
            <Artist>
              <Img
                img={{ uri: item.contentPicture }}
                style={{
                  height: 230,
                  width: 250,
                  borderRadius: 0,
                }}
              />
            </Artist>
            <View style={{ marginTop: 15 }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  fontFamily: 'OpenSans-Bold',
                  color: '#343a40',
                  paddingHorizontal: 10,
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  fontFamily: 'OpenSans-Regular',
                  color: '#8c8c8c',
                  marginTop: 5,
                  paddingHorizontal: 20,
                }}
              >
                {item.description}
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <Icon name="subCard" width={20} height={20} color="#343a40" />
              <Text style={{ flexDirection: 'row' }}>
                {RnNumberFormat(item.price)}
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            {item.trailerLink ? (
              <Btn
                onPress={() => {
                  requestAnimationFrame(() => {
                    Linking.openURL(item.trailerLink);
                  });
                }}
                width={180}
                text="View Trailer"
                color="#21305f"
                tColor="white"
                padding={15}
                marginTop={10}
                radius={20}
              />
            ) : null}
            <Btn
              onPress={() => {
                requestAnimationFrame(() => {
                  Linking.openURL(item.contentLink);
                });
              }}
              width={180}
              text="Go To Lesson"
              color="#83bb44"
              tColor="white"
              padding={15}
              marginTop={15}
              radius={20}
            />
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

export default LessonsScreen;
