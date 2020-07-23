import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from 'react-native';

import styled from 'styled-components';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import Icon from '../components/utilities/Icon';

export default function AboutScreen(props) {
  const {
    navigation: { navigate },
    addScreen,
  } = props;
  useFocusEffect(
    React.useCallback(() => {
      addScreen('About Us');
    }, [])
  );
  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#8c8c8c' }} />
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}
      >
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <Title>About Rwanda Books</Title>
            <Text
              style={{
                marginTop: 25,
                paddingHorizontal: 30,
                textAlign: 'center',
                color: '#8c8c8c',
                fontSize: 14,
                fontFamily: 'OpenSans-SemiBold',
              }}
            >
              <Text style={{ color: '#83bb44', fontWeight: 'bold' }}>
                Rwanda Books
              </Text>{' '}
              is a platform that provides online learning services and Book
              store services. Users can get access to either free content or
              subscribe for non-free content.
            </Text>
          </View>
          <Content>
            <View style={{ marginTop: 20 }}>
              <Link>App Version</Link>
            </View>
            <Small> V 1.0.0</Small>

            <TouchableOpacity
              style={{ marginTop: 25 }}
              onPress={() => {
                requestAnimationFrame(() => {
                  Linking.openURL(
                    'http://rwanda-books.herokuapp.com/about/privacy-policy'
                  );
                });
              }}
            >
              <View>
                <Link>Terms And Conditions</Link>
              </View>
            </TouchableOpacity>
            <Small>
              All the things that you need to know when using Rwanda Books!
            </Small>

            <TouchableOpacity
              style={{ marginTop: 25 }}
              onPress={() => {
                requestAnimationFrame(() => {
                  Linking.openURL(
                    'http://rwanda-books.herokuapp.com/about/terms-conditions'
                  );
                });
              }}
            >
              <View>
                <Link>Privacy Policy</Link>
              </View>
            </TouchableOpacity>
            <Small>All the things that are important to both of us!</Small>

            <TouchableOpacity
              style={{ marginTop: 25 }}
              onPress={() => {
                requestAnimationFrame(() => {
                  Linking.openURL('mailto:umudenza@gmail.com');
                });
              }}
            >
              <View>
                <Link>Contact Us</Link>
              </View>
            </TouchableOpacity>
            <Small>umudenza@gmail.com</Small>
            <Small style={{ marginBottom: 25 }}>+250 788 508 414</Small>

            <View style={{ marginTop: 0 }}>
              <Link>Social Media</Link>
            </View>
            <Small style={{ marginBottom: 25 }}>
              Follow us on our social media platforms!
            </Small>
            <View style={{ flexDirection: 'row', marginBottom: 25 }}>
              <TouchableOpacity
                style={{ marginRight: 25 }}
                onPress={() => {
                  requestAnimationFrame(() => {
                    Linking.openURL('https://facebook.com');
                  });
                }}
              >
                <View style={{ flex: 2 }}>
                  <Icon name="facebook" width={30} height={30} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginRight: 25 }}
                onPress={() => {
                  requestAnimationFrame(() => {
                    Linking.openURL('https://instagram.com');
                  });
                }}
              >
                <View style={{ flex: 2 }}>
                  <Icon name="instagram" width={30} height={30} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  requestAnimationFrame(() => {
                    Linking.openURL('https://twitter.com');
                  });
                }}
              >
                <View style={{ flex: 6 }}>
                  <Icon name="twitter" width={30} height={30} />
                </View>
              </TouchableOpacity>
            </View>
          </Content>
        </ScrollView>
      </View>
    </>
  );
}

const Content = styled.View`
  flex: 1;
  padding: 0 30px 0 30px;
  margin-top: 30px;
`;

const Title = styled.Text`
  color: #343a40;
  font-family: 'OpenSans-SemiBold';
  font-size: 20px;
  margin-top: 16px;
  margin-bottom: 8px;
  text-align: center;
`;

const Link = styled.Text`
  color: #343a40;
  font-family: 'OpenSans-SemiBold';
  font-size: 15px;
`;

const Small = styled.Text`
  color: #8c8c8c;
  font-family: 'OpenSans-Regular';
  font-size: 12px;
  margin-top: 10px;
`;
