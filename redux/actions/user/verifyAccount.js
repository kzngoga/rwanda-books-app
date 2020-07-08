import axios from '..';
import {
  VERIFY_ACCOUNT_SUCCESS,
  VERIFY_ACCOUNT_FAILED,
} from '../../actionTypes';

export default (urlToken) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/v1/users/verify?token=${urlToken}`);
    const {
      data: { message },
    } = response;
    dispatch({
      type: VERIFY_ACCOUNT_SUCCESS,
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
    dispatch({ type: VERIFY_ACCOUNT_FAILED, error });
  }
};
