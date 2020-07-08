import axios, { configAdmin } from '..';
import {
  FETCH_LESSON_TYPES_SUCCESS,
  FETCH_LESSON_TYPES_FAILED,
  CLEAR_LESSON_TYPES,
  CLEAR_ADD_TYPES,
  CLEAR_UPDATE_TYPES,
} from '../../actionTypes';

export default () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_LESSON_TYPES });
    dispatch({ type: CLEAR_ADD_TYPES });
    dispatch({ type: CLEAR_UPDATE_TYPES });

    const response = await axios.get('/api/v1/types/all', configAdmin);

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: FETCH_LESSON_TYPES_SUCCESS,
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
    dispatch({ type: FETCH_LESSON_TYPES_FAILED, error });
  }
};
