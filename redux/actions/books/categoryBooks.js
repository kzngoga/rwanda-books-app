import axios, { configUser } from '..';
import {
  FETCH_CATEGORY_BOOKS_SUCCESS,
  FETCH_CATEGORY_BOOKS_FAILED,
  CLEAR_FETCH_CATEGORY,
} from '../../actionTypes';

export default (page) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_FETCH_CATEGORY });

    const response = await axios.get(
      `/api/v1/books/all?page=${page}&limit=8`,
      configUser
    );

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: FETCH_CATEGORY_BOOKS_SUCCESS,
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
    dispatch({ type: FETCH_CATEGORY_BOOKS_FAILED, error });
  }
};
