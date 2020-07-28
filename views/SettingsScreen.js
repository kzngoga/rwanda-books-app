/* eslint-disable no-alert */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  RefreshControl,
} from 'react-native';

import { connect } from 'react-redux';
import { setNavReset } from '../redux/actions/navigation/navigation';
import styled from 'styled-components';
import { ScrollView } from 'react-native-gesture-handler';
import Btn from '../components/utilities/CustomButton';
import LoaderButton from '../components/utilities/LoaderButton';
import Icon from '../components/utilities/Icon';
import Loader from '../components/utilities/Loader';
import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';
import fetchProfile from '../redux/actions/user/fetchProfile';

function SettingsScreen(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [logout, setLogout] = useState(false);
  const [status, setStatus] = useState('initial');
  const [profileData, setProfileData] = useState({});

  const {
    navigation: { navigate },
    addScreen,
    getProfile,
    fetchProfile,
    setNavReset,
  } = props;
  useFocusEffect(
    React.useCallback(() => {
      addScreen('Account', 'no-back');
      if (status === 'initial') {
        fetchProfile();
        setStatus('fetching');
      }
      if (getProfile.status === 'error') {
        setStatus('unknown_error');
      }
      if (getProfile.status === 'success') {
        setStatus('success');
        setProfileData(getProfile.data);
      }
      setRefreshing(false);
    }, [getProfile])
  );
  const Navigation = async (url, title) => {
    try {
      const token = await AsyncStorage.getItem('RB_userToken');
      if (!token) {
        navigate('SplashScreen');
      }
      const baseUrl = 'http://rwanda-books.herokuapp.com';
      navigate('MyWebView', {
        title,
        url: `${baseUrl}${url}`,
      });
    } catch (e) {
      alert('Error Reading Token');
    }
  };

  const handleLogout = async () => {
    setLogout(true);
    try {
      await AsyncStorage.clear();
      setLogout(false);
      return setNavReset('logout');
    } catch (e) {
      console.warn(e);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchProfile();
    setStatus('fetching');
  };

  const DisplayData = ({ children }) => {
    let data;
    switch (status) {
      case 'success':
        data = <>{children}</>;
        break;
      case 'fetching':
        data = <Loader text="Loading profile..." marginTop="45%" />;
        break;
      case 'unknown_error':
        data = (
          <Text
            style={{
              fontFamily: 'OpenSans-Bold',
              color: '#343a40',
              marginTop: '45%',
              textAlign: 'center',
            }}
          >
            Ooops, Something Unexpected Occured!
          </Text>
        );
        break;
      default:
        data = <Loader text="Loading profile..." marginTop="45%" />;
    }
    return data;
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
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <DisplayData>
            <View style={{ alignItems: 'center' }}>
              <Artist>
                <Initials>
                  <InitText>
                    {profileData.firstname
                      ? profileData.firstname.charAt(0).toUpperCase()
                      : ''}
                  </InitText>
                </Initials>
              </Artist>
              <Title>{`${profileData.firstname} ${profileData.lastname}`}</Title>
              <Small>{profileData.username}</Small>
              <View>
                <Btn
                  onPress={() => {
                    requestAnimationFrame(() => {
                      Navigation('/user/profile/edit', 'Update Profile');
                    });
                  }}
                  width={120}
                  text="Edit Profile"
                  color="#83bb44"
                  tColor="white"
                  padding={8}
                  marginTop={10}
                />
              </View>
            </View>
            <Content>
              <View style={{ marginTop: 20 }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <View
                    style={{
                      height: 15,
                      width: 20,
                      marginRight: 6,
                      marginTop: 2,
                    }}
                  >
                    <Icon name="globe" width={20} height={20} color="#343a40" />
                  </View>
                  <Link>Country Of Origin</Link>
                </View>
              </View>
              <SmallTitle>{profileData.country}</SmallTitle>
              <View style={{ marginTop: 20 }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <View
                    style={{
                      height: 15,
                      width: 20,
                      marginRight: 6,
                      marginTop: 5,
                    }}
                  >
                    <Icon
                      name="contact"
                      width={20}
                      height={20}
                      color="#343a40"
                    />
                  </View>
                  <Link>Contacts</Link>
                </View>
              </View>
              <SmallTitle>{profileData.phoneNumber}</SmallTitle>
              <SmallTitle>{profileData.email}</SmallTitle>
              <View style={{ marginTop: 20 }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <View
                    style={{
                      height: 15,
                      width: 20,
                      marginRight: 6,
                      marginTop: 2,
                    }}
                  >
                    <Icon
                      name="subCard"
                      width={20}
                      height={20}
                      color="#343a40"
                    />
                  </View>
                  <Link>Subscription Details</Link>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  requestAnimationFrame(() => {
                    Navigation(
                      '/user/subscription-details',
                      'Subsrciption Details'
                    );
                  });
                }}
              >
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <SmallTitle>Go to Page</SmallTitle>
                  </View>
                  <View style={{ flex: 3, marginTop: 9 }}>
                    <Icon name="link" width={20} height={20} color="#fff" />
                  </View>
                </View>
              </TouchableOpacity>

              <View style={{ marginTop: 20 }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <View
                    style={{
                      height: 15,
                      width: 20,
                      marginRight: 6,
                      marginTop: 2,
                    }}
                  >
                    <Icon name="lock" width={20} height={20} color="#343a40" />
                  </View>
                  <Link>Other Actions</Link>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  requestAnimationFrame(() => {
                    Navigation('/user/update-password', 'Change Password');
                  });
                }}
              >
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 2 }}>
                    <SmallTitle>Change Password</SmallTitle>
                  </View>
                  <View style={{ flex: 3, marginTop: 9 }}>
                    <Icon name="link" width={20} height={20} color="#fff" />
                  </View>
                </View>
              </TouchableOpacity>

              <View style={{ marginTop: 20 }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <View
                    style={{
                      height: 15,
                      width: 20,
                      marginRight: 6,
                      marginTop: 2,
                    }}
                  >
                    <Icon name="info" width={20} height={20} color="#343a40" />
                  </View>
                  <Link>About Us</Link>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  requestAnimationFrame(() => {
                    navigate('AboutScreen');
                  });
                }}
              >
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <SmallTitle>Go to Page</SmallTitle>
                  </View>
                  <View style={{ flex: 3, marginTop: 9 }}>
                    <Icon name="link" width={20} height={20} color="#fff" />
                  </View>
                </View>
              </TouchableOpacity>
            </Content>
            <About>
              <View>
                {logout ? (
                  <LoaderButton
                    width={150}
                    loaderColor="#ffffff"
                    color="#8c8c8c"
                    disabledColor="#8c8c8c"
                    loaderSize="small"
                    padding={8}
                    marginTop={10}
                  />
                ) : (
                  <Btn
                    onPress={handleLogout}
                    width={120}
                    text="Logout"
                    color="#585858"
                    tColor="white"
                    padding={8}
                    marginTop={10}
                  />
                )}
              </View>
            </About>
          </DisplayData>
        </ScrollView>
      </View>
    </>
  );
}

const Artist = styled.View`
  align-items: center;
  margin-top: 30px;
`;

const Initials = styled.View`
  background-color: #585858;
  height: 140px;
  width: 140px;
  border-radius: 70px;
`;

const InitText = styled.Text`
  color: #c4c4c4;
  font-size: 55px;
  font-family: 'OpenSans-Bold';
  align-self: center;
  margin-top: 30px;
`;

const Content = styled.View`
  flex: 1;
  padding: 0 30px 0 30px;
  margin-top: 18px;
`;

const About = styled.View`
  flex: 1;
  padding: 0 30px 0 30px;
  margin-top: 25px;
  margin-bottom: 23px;
`;

const Title = styled.Text`
  color: #343a40;
  font-family: 'OpenSans-SemiBold';
  font-size: 20px;
  margin-top: 16px;
  margin-bottom: 2px;
  text-align: center;
`;

const Link = styled.Text`
  color: #343a40;
  font-family: 'OpenSans-Bold';
  font-size: 16.5px;
`;

const Small = styled.Text`
  color: #8c8c8c;
  font-family: 'OpenSans-Regular';
  font-size: 12px;
  text-align: center;
`;

const SmallTitle = styled.Text`
  color: #8c8c8c;
  font-family: 'OpenSans-Regular';
  font-size: 12px;
  margin-top: 8px;
`;

const mapStateToProps = ({ getProfile }) => ({ getProfile });

export default connect(mapStateToProps, { fetchProfile, setNavReset })(
  SettingsScreen
);
