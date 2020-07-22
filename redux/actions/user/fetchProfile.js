import axios, { configUser } from '../.';
import { FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILED } from '../../actionTypes';

const fetchProfile = () => async (dispatch) => {
  try {
    const response = await axios.get(
      '/api/v1/users/profile',
      await configUser()
    );
    dispatch({
      type: FETCH_PROFILE_SUCCESS,
      data: response.data.data,
      message: response.data.message,
    });
  } catch (err) {
    dispatch({
      type: FETCH_PROFILE_FAILED,
      error: err.message,
    });
  }
};

export default fetchProfile;
