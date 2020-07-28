import axios, { configUser } from '..';
import {
  SINGLE_BOOK_SUCCESS,
  SINGLE_BOOK_FAILED,
  CLEAR_BOOK,
} from '../../actionTypes';

export default (id) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_BOOK });

    const response = await axios.get(`/api/v1/books/${id}`, await configUser());

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: SINGLE_BOOK_SUCCESS,
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
    dispatch({ type: SINGLE_BOOK_FAILED, error });
  }
};
