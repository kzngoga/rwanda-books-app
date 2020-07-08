import axios, { configAdmin } from '..';
import {
  FETCH_LESSON_SUCCESS,
  FETCH_LESSON_FAILED,
  CLEAR_LESSON,
  CLEAR_UPDATE_LESSON,
} from '../../actionTypes';

export default (id) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_LESSON });
    dispatch({ type: CLEAR_UPDATE_LESSON });

    const response = await axios.get(`/api/v1/lessons/${id}`, configAdmin);

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: FETCH_LESSON_SUCCESS,
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
    dispatch({ type: FETCH_LESSON_FAILED, error });
  }
};
