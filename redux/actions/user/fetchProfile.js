import axios, { configUser } from '..';
import {
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILED,
  CLEAR_PROFILE,
  CLEAR_UPDATE_PROFILE,
} from '../../actionTypes';

export default () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: CLEAR_UPDATE_PROFILE });

    const response = await axios.get('/api/v1/users/profile', configUser);

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: FETCH_PROFILE_SUCCESS,
      message,
      results: data,
    });
  } catch (err) {
    let error = {};
    if (err.response) {
      const {
        data: { status, message },
      } = err.response;
      error = { status, message };
    } else {
      error = {
        status: 500,
        message: err.message,
      };
    }
    dispatch({ type: FETCH_PROFILE_FAILED, error });
  }
};
