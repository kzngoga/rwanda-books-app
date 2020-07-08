import axios, { configUser } from '..';
import {
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
} from '../../actionTypes';

export default (payload) => async (dispatch) => {
  try {
    const response = await axios.patch(
      '/api/v1/users/update/change-password',
      payload,
      configUser
    );
    const {
      data: { message },
    } = response;
    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      message,
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
    dispatch({ type: CHANGE_PASSWORD_FAILED, error });
  }
};
