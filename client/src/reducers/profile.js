import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  CLEAR_PROFILES,
  GET_PROFILEID,
  GET_CENTER,
  GET_CENTERID,
  GET_CENTER_PRICE
} from '../actions/Types';

const initialState = {
  profile: null,
  profileid: null,
  centerid: null,
  profiles: [],
  centers: [],
  repos: [],
  loading: true,
  error: {},
  price:{}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case GET_CENTER:
      return {
        ...state,
        centers: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };
    case CLEAR_PROFILES:
      return {
        ...state,
        profiles: [],
        loading: false
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    case GET_PROFILEID:
      return {
        ...state,
        profileid: payload,
        loading: false
      };
      case GET_CENTERID:
      return {
        ...state,
        centerid: payload,
        loading: false
      };
      case GET_CENTER_PRICE:
      return {
        ...state,
        price: payload,
        loading: false
      };
    default:
      return state;
  }
}
