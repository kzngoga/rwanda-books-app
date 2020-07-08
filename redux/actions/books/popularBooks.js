import axios from '..';
import { FETCH_POPULAR_SUCCESS, FETCH_POPULAR_FAILED } from '../../actionTypes';

export default (page) => async (dispatch) => {
  try {
    const response = await axios.get(
      `/api/v1/books/popular-books?page=${page}&limit=8`
    );

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: FETCH_POPULAR_SUCCESS,
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
    dispatch({ type: FETCH_POPULAR_FAILED, error });
  }
};
