import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_ALLUSER,
  CONFIRMATION_CODE,
  DELETE_USER_ADMIN,
  BLOCK_USER_ADMIN
} from '../actions/types';
const firebase = require('firebase');
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  role: false,
  profile: null,
  profiles: [],
  code: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,

        user: payload,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);

      return {
        ...state,
        ...payload,
        isAuthenticated: true,

        loading: false,
        user: payload,
      };

    case BLOCK_USER_ADMIN:
      return {
        ...state,
        code: payload,
        loading: false,
        isAuthenticated: false,
      };

    case CONFIRMATION_CODE:
      return {
        ...state,
        code: payload,
        loading: false,
        isAuthenticated: false,
      };
    case GET_PROFILE:
      console.log(payload)
      return {
        ...state,
        profile: payload,
        loading: false,
        isAuthenticated: true,
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        user: payload,
        loading: false,
        isAuthenticated: true,
      };

    case GET_ALLUSER:
      return {
        ...state,
        profiles: payload,
        loading: false,
        isAuthenticated: true,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      firebase.auth().signOut();
    //  alert('FB Logged Out');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    case DELETE_USER_ADMIN:
      console.log(payload)
      return {
        ...state,
        profiles: [...state.profiles.filter(profile => profile._id != payload.id)],
        loading: false,
      }

    default:
      return state;
  }
}
