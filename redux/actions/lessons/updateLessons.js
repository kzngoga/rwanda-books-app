import axios, { configAdmin } from '..';
import { UPDATE_LESSON_SUCCESS, UPDATE_LESSON_FAILED } from '../../actionTypes';

export default (payload1, payload2, id) => async (dispatch) => {
  try {
    let response;
    if (payload1) {
      response = await axios.patch(
        `/api/v1/lessons/update/${id}`,
        payload1,
        configAdmin
      );
    }

    if (payload2) {
      response = await axios.patch(
        `/api/v1/lessons/update/change-photo/${id}`,
        payload2,
        configAdmin
      );
    }

    const {
      data: { message },
    } = response;
    dispatch({
      type: UPDATE_LESSON_SUCCESS,
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
    dispatch({ type: UPDATE_LESSON_FAILED, error });
  }
};
