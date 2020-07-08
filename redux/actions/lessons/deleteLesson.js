import axios, { configAdmin } from '..';
import { REMOVE_LESSON_SUCCESS, REMOVE_LESSON_FAILED } from '../../actionTypes';

export default (id) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `/api/v1/lessons/delete/${id}`,
      configAdmin
    );

    const {
      data: { message },
    } = response;
    dispatch({
      type: REMOVE_LESSON_SUCCESS,
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
    dispatch({ type: REMOVE_LESSON_FAILED, error });
  }
};
