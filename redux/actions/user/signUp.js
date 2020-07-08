import axios from '..';
import {
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
} from '../../actionTypes';

export default (payload) => async (dispatch) => {
  try {
    const response = await axios.post('/api/v1/users/signup', payload);
    const {
      data: { message },
    } = response;
    dispatch({
      type: USER_SIGNUP_SUCCESS,
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
    dispatch({ type: USER_SIGNUP_FAILED, error });
  }
};
