import axios, { configUser } from '..';
import {
  RATE_BOOK_SUCCESS,
  RATE_BOOK_FAILED,
  SET_TOAST,
  CLEAR_RATING,
} from '../../actionTypes';

export default (payload, id) => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_RATING,
    });
    const response = await axios.post(
      `/api/v1/rating/add/${id}`,
      payload,
      await configUser()
    );
    const {
      data: { message },
    } = response;
    dispatch({
      type: RATE_BOOK_SUCCESS,
      message,
    });
    dispatch({
      type: SET_TOAST,
      payload: 'Book Rated Successfuly!',
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
    dispatch({
      type: SET_TOAST,
      payload: 'RateError:' + ' ' + err.response.data.message,
    });
  }
};
