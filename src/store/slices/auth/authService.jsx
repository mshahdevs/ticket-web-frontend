import axios from 'axios';

const API_URL = 'http://localhost:8080/api/user';

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    //encode token before storing in LocalStorage

    const user = { ...response.data };

    // const { token } = response.data;
    localStorage.setItem('user', JSON.stringify(user));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData);

  if (response.data) {
    //encode token before storing in LocalStorage
    const user = { ...response.data };
    // user.token = btoa(user.token);

    localStorage.setItem('user', JSON.stringify(user));
  }
  return response.data;
};
const logout = () => localStorage.removeItem('user');

const authService = {
  register,
  login,

  logout,
};
export default authService;
