import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED
} from './../actions/Types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  role: null,
  loading: true,
  user: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        role: payload.role,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      localStorage.setItem('role', payload.role)
      return {
        ...state,
        ...payload,
        role:  payload.role,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      return {
        ...state,
        token: null,
        role: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
