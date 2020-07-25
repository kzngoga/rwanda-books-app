import axios, { configUser } from '..';
import {
  FETCH_LESSONS_SUCCESS,
  FETCH_LESSONS_FAILED,
  CLEAR_LESSONS,
  CLEAR_REMOVE_LESSON,
} from '../../actionTypes';

export default () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_LESSONS });
    dispatch({ type: CLEAR_REMOVE_LESSON });
    const response = await axios.get('/api/v1/lessons/all', await configUser());

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: FETCH_LESSONS_SUCCESS,
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
    dispatch({ type: FETCH_LESSONS_FAILED, error });
  }
};
