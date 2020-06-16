import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_ALLUSER, CONFIRMATION_CODE,
  DELETE_USER_ADMIN,
  BLOCK_USER_ADMIN
} from "./types";

import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";
import axios from "axios";

export const getAllusers = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/authentication/getall/profiles");
    dispatch({
      type: GET_ALLUSER,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.message,
    });
  }
};

export const SendVerificationCodeToEmail = email => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post("/api/authentication/send/code", { email: email }, config);

    dispatch({
      type: CONFIRMATION_CODE,
      payload: res.data
    })

  } catch (err) {

    console.log(err)
  }

}

export const registerUser = (user) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { fname, lname, email, mobile, country, city, password, image } = user;
  const body = JSON.stringify({
    fname,
    lname,
    email,
    mobile,
    country,
    city,
    password,
    image,
  });

  try {
    const response = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
      payload: err.message,
    });

    //  dispatch(setAlert(error.message.msg,'danger'));
  }
};
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/authentication");

    if (res.data.status === "BLOCKED") {
      dispatch({
        type: AUTH_ERROR,
        payload: { msg: "BLOCKED BY ADMIN" }
      });
    }
    else if (res.data.role === true) {
      localStorage.setItem("admin", true);
    }
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Login User
export const login = (user) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { email, password } = user;
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/authentication", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
  localStorage.removeItem('currUser')
  localStorage.removeItem('chatID')
  window.location.href = "/";
};

export const getProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/users/profile");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err },
    });
  }
};

export const updateProfile = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post("api/users/profile/update", data, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data,
    });

    dispatch(setAlert("profile updated successfully", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

// Delete user by admin
export const deleteUserByAdmin = id => async dispatch => {
  if (window.confirm('Are you sure to delete?')) {
    try {
      await axios.delete(`/api/users/admin/users/${id}`);

      dispatch({
        type: DELETE_USER_ADMIN,
        payload: { id }
      });
      // dispatch(setAlert('User Deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

export const blockUserByAdmin = (id, sts) => async dispatch => {
  if (window.confirm('Are you sure to ' + sts + ' the User?')) {
    try {
      await axios.post(`/api/users/admin/users/block/${id}/${sts}`);

      dispatch({
        type: BLOCK_USER_ADMIN,
        payload: { id }
      });
      window.location.reload();
      // dispatch(setAlert('User Deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
