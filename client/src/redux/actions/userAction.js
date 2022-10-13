import axios from "axios";
import {
  FOLLOW_FAIL,
  FOLLOW_REQUEST_FAIL,
  FOLLOW_REQUEST_START,
  FOLLOW_REQUEST_SUCCESS,
  FOLLOW_START,
  FOLLOW_SUCCESS,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_START,
  LOGIN_REQUEST_SUCCESS,
  UPDATE_REQUEST_FAIL,
  UPDATE_REQUEST_START,
  UPDATE_REQUEST_SUCCESS,
  USER_REQUEST_FAIL,
  USER_REQUEST_START,
  USER_REQUEST_SUCCESS,
} from "../constants/userConstans";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST_START });
    const res = await axios.post("http://localhost:4000/api/login", {
      email,
      password,
    });
    dispatch({ type: LOGIN_REQUEST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: LOGIN_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const editProfile = (userDetail,id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_REQUEST_START });
    const res = await axios.put(`http://localhost:4000/api/edit-profile/${id}`, userDetail);
    dispatch({ type: UPDATE_REQUEST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: UPDATE_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_REQUEST_START });
    const res = await axios.get(`http://localhost:4000/api/getuser/${id}`);
    dispatch({ type: USER_REQUEST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: USER_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const follow = (userId,id) => async (dispatch) => {
  try {
    dispatch({ type: FOLLOW_START });
    await axios.put(`http://localhost:4000/api/follow-unfollow/${id}`, {
      userId,
    });
    dispatch({ type: FOLLOW_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: FOLLOW_FAIL,
      payload: "fail",
    });
  }
};

