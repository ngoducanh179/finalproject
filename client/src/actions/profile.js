import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_REPOS,
  CLEAR_PROFILES,
  GET_PROFILEID,
  GET_CENTER,
  CENTER_ERROR,
  GET_CENTERID,
  GET_CENTER_PRICE,
  BOOKING_SCHEDULE,
  UPDATE_ORDER
} from './Types';

// Get current users profile

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get all profiles
export const getProfiles = (query = '') => async dispatch => {
  dispatch({ type: CLEAR_PROFILES });
  try {
    const res = await axios.get(`/api/profile/?query=${query}`);
    
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get all profiles
export const getCenters = (query = '') => async dispatch => {
  dispatch({ type: CLEAR_PROFILES });
  try {
    const res = await axios.get(`/api/profile/centers/?query=${query}`);
    dispatch({
      type: GET_CENTER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CENTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//get profile by id
export const getProfilesById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({ 
      type: GET_PROFILEID,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get github repos
export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update profile

export const createProfile = (
  FormData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/profile', FormData, config);
    
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Experience

export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Education

export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Education Added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete experience

export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete experience

export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure ? Your account can not undone')) {
    try {
      await axios.delete('/api/profile');
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert('Your account deleted', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Create or update profile center

export const createProfileCenter = (
  FormData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/center/profile', FormData, config);
    
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
    if (!edit) {
      history.push('/dashboard/center');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//get profile by id
export const getCenterById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/center/${userId}`);
    dispatch({ 
      type: GET_CENTERID,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CENTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//get sport
export const getPriceSports = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/center/price/${userId}`);
    dispatch({ 
      type: GET_CENTER_PRICE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CENTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//get profile by id
export const updateBooking = (userId, centerId, sport, FormData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    await axios.post(`/api/profile/center/booking/${sport}/${userId}/${centerId}`, FormData, config);
    dispatch(setAlert('Đặt Lịch Thành Công', 'success'));
    history.push('/dashboard')
    dispatch({ 
      type: BOOKING_SCHEDULE,
    });
  } catch (err) {
    dispatch({
      type: CENTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//get profile by id
export const updateOrder = (centerId, orderId, FormData) => async dispatch => {
  try {
    console.log(222);
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    await axios.post(`/api/profile/center/order/${centerId}/${orderId}`, FormData, config);
    dispatch(setAlert('Update order thành công!', 'success'));
    dispatch({ 
      type: UPDATE_ORDER,
    });
  } catch (err) {
    dispatch({
      type: CENTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


