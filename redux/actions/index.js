import axios from 'axios';

export default axios.create({
  baseURL: 'https://ibitabo-rwanda-api.herokuapp.com/',
});

export const configAdmin = {
  headers: {
    ContentType: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('RB_adminToken')}`,
  },
};

export const configUser = {
  headers: {
    ContentType: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('RB_userToken')}`,
  },
};
