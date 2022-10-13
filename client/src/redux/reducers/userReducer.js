import {
  CLEAR_ERROR,
  FOLLOW,
  FOLLOW_FAIL,
  FOLLOW_REQUEST_FAIL,
  FOLLOW_REQUEST_START,
  FOLLOW_REQUEST_SUCCESS,
  FOLLOW_START,
  FOLLOW_SUCCESS,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_START,
  LOGIN_REQUEST_SUCCESS,
  LOGOUT,
  UPDATE_REQUEST_FAIL,
  UPDATE_REQUEST_START,
  UPDATE_REQUEST_SUCCESS,
  USER_REQUEST_FAIL,
  USER_REQUEST_START,
  USER_REQUEST_SUCCESS,
} from "../constants/userConstans";
import {
  FETCHCOMMENT_REQUEST_FAIL,
  FETCHCOMMENT_REQUEST_START,
  FETCHCOMMENT_REQUEST_SUCCESS,
} from "../constants/postConstants";

export const loginReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST_START:
    case UPDATE_REQUEST_START:
    case USER_REQUEST_START:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_REQUEST_SUCCESS:
    case UPDATE_REQUEST_SUCCESS:
    case USER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        token: action.payload.token,
      };
    case LOGIN_REQUEST_FAIL:
    case UPDATE_REQUEST_FAIL:
    case USER_REQUEST_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case FOLLOW_START:
      return {
        ...state,
        loading:true,
      };
    case FOLLOW_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case FOLLOW_FAIL:
      return {
        ...state,
       error:action.payload
      };

    case LOGOUT:
      return {
        loading: false,
        user: null,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const commentReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCHCOMMENT_REQUEST_START:
      return {
        loading: true,
      };
    case FETCHCOMMENT_REQUEST_SUCCESS:
      return {
        loading: false,
        comments: action.payload,
      };
    case FETCHCOMMENT_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
