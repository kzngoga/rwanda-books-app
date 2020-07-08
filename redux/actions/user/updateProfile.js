import axios, { configUser } from '..';
import {
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
} from '../../actionTypes';

export default (payload) => async (dispatch) => {
  try {
    const response = await axios.patch(
      '/api/v1/users/update',
      payload,
      configUser
    );

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
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
    dispatch({ type: UPDATE_PROFILE_FAILED, error });
  }
};
