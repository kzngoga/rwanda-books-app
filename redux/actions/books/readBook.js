import axios, { configUser } from '..';
import { READ_BOOK_SUCCESS, READ_BOOK_FAILED } from '../../actionTypes';

export default (id) => async (dispatch) => {
  try {
    const response = await axios.post(
      `/api/v1/reads/new/${id}`,
      {},
      await configUser()
    );
    const {
      data: { message },
    } = response;
    dispatch({
      type: READ_BOOK_SUCCESS,
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
    dispatch({ type: READ_BOOK_FAILED, error });
  }
};
