import axios from "axios";
import { FETCHCOMMENT_REQUEST_FAIL, FETCHCOMMENT_REQUEST_START, FETCHCOMMENT_REQUEST_SUCCESS } from "../constants/postConstants";


export const fetchComments = (id) => async (dispatch) => {
    try {
      dispatch({ type: FETCHCOMMENT_REQUEST_START });
      const res = await axios.get(`http://localhost:4000/api/comments/${id}`)
    
      dispatch({ type: FETCHCOMMENT_REQUEST_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({
        type: FETCHCOMMENT_REQUEST_FAIL,
        payload: error.response.data.message,
      });
    }
  };