import axios, { configUser } from '..';
import { RATE_BOOK_SUCCESS, RATE_BOOK_FAILED } from '../../actionTypes';

export default (payload, id) => async (dispatch) => {
  try {
    const response = await axios.post(
      `/api/v1/rating/add/${id}`,
      payload,
      configUser
    );
    const {
      data: { message },
    } = response;
    dispatch({
      type: RATE_BOOK_SUCCESS,
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
    dispatch({ type: RATE_BOOK_FAILED, error });
  }
};
