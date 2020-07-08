import axios, { configAdmin } from '..';
import {
  UPDATE_LESSON_TYPES_SUCCESS,
  UPDATE_LESSON_TYPES_FAILED,
} from '../../actionTypes';

export default (payload, id) => async (dispatch) => {
  try {
    const response = await axios.patch(
      `/api/v1/types/update/${id}`,
      payload,
      configAdmin
    );

    const {
      data: { message },
    } = response;
    dispatch({
      type: UPDATE_LESSON_TYPES_SUCCESS,
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
    dispatch({ type: UPDATE_LESSON_TYPES_FAILED, error });
  }
};
