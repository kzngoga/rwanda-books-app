import axios, { configUser } from '..';
import {
  REMOVE_FAVORITES_SUCCESS,
  REMOVE_FAVORITES_FAILED,
} from '../../actionTypes';

export default (id) => async (dispatch) => {
  try {
    const response = await axios.patch(
      `/api/v1/favorites/remove/${id}`,
      {},
      configUser
    );

    const {
      data: { message },
    } = response;
    dispatch({
      type: REMOVE_FAVORITES_SUCCESS,
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
    dispatch({ type: REMOVE_FAVORITES_FAILED, error });
  }
};
