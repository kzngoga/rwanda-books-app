import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default axios.create({
  baseURL: 'https://ibitabo-rwanda-api.herokuapp.com/',
});

export const configAdmin = async () => ({
  headers: {
    ContentType: 'application/json',
    Authorization: `Bearer ${await AsyncStorage.getItem('RB_adminToken')}`,
  },
});

export const configUser = async () => ({
  headers: {
    ContentType: 'application/json',
    Authorization: `Bearer ${await AsyncStorage.getItem('RB_userToken')}`,
  },
});
