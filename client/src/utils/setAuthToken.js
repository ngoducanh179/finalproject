import axios from 'axios';

const setAuthToken = (token, role) => {
  if (token && role) {
    axios.defaults.headers.common['x-auth-token'] = token;
    axios.defaults.headers.common['role'] = role;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
    delete axios.defaults.headers.common['role'];
  }
};

export default setAuthToken;
