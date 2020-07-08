import axios, { configAdmin } from '..';
import {
  ADD_LESSON_TYPES_SUCCESS,
  ADD_LESSON_TYPES_FAILED,
} from '../../actionTypes';

export default (payload) => async (dispatch) => {
  try {
    const response = await axios.post(
      '/api/v1/types/new',
      payload,
      configAdmin
    );

    const {
      data: { message },
    } = response;
    dispatch({
      type: ADD_LESSON_TYPES_SUCCESS,
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
    dispatch({ type: ADD_LESSON_TYPES_FAILED, error });
  }
};
