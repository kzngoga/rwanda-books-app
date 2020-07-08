import axios from '..';
import { USER_LOGIN_SUCCESS, USER_LOGIN_FAILED } from '../../actionTypes';

export default (payload) => async (dispatch) => {
  try {
    const response = await axios.post('/api/v1/users/login', payload);

    const {
      data: {
        message,
        data: { token, _id, firstname },
      },
    } = response;
    const userData = { id: _id, firstname };
    dispatch({
      type: USER_LOGIN_SUCCESS,
      message,
      token,
      results: userData,
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

    dispatch({ type: USER_LOGIN_FAILED, error });
  }
};
