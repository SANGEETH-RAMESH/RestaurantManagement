import axios from 'axios';
import store from '../redux/store';
import { loginSuccess as userLogin, logout as userLogout } from '../redux/userAuthSlice';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const USER_ACCESS_TOKEN_KEY = 'userAccessToken';
const USER_REFRESH_TOKEN_KEY = 'userRefreshToken';
const USER_REFRESH_ENDPOINT = '/user/token/refresh';
const USER_LOGIN_REDIRECT = '/login';

const createUserApiClient = () => {
  const instance = axios.create({
    baseURL: apiUrl,
    headers: { 'Content-Type': 'application/json' },
  });

  instance.interceptors.request.use(
    (req) => {
      const accessToken = localStorage.getItem(USER_ACCESS_TOKEN_KEY);
      if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
      }
      return req;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem(USER_REFRESH_TOKEN_KEY);
          console.log(refreshToken,"Refreshhhhh")
          if (!refreshToken) throw new Error('Refresh token missing');
          
          const { data } = await axios.post(`${apiUrl}${USER_REFRESH_ENDPOINT}`, {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = data.message;
          
          store.dispatch(
            userLogin({ accessToken, refreshToken: newRefreshToken, isLoggedIn: true })
          );
          localStorage.setItem(USER_ACCESS_TOKEN_KEY, accessToken);
          localStorage.setItem(USER_REFRESH_TOKEN_KEY, newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return instance(originalRequest);
        } catch (refreshErr) {
          console.error(refreshErr);
          store.dispatch(userLogout({ isLoggedIn: false }));
          localStorage.removeItem(USER_ACCESS_TOKEN_KEY);
          localStorage.removeItem(USER_REFRESH_TOKEN_KEY);
          window.location.href = USER_LOGIN_REDIRECT;
        }
      }
      if (error.response?.status === 401) {
        store.dispatch(userLogout({ isLoggedIn: false }));
        localStorage.removeItem(USER_ACCESS_TOKEN_KEY);
        localStorage.removeItem(USER_REFRESH_TOKEN_KEY);
        window.location.href = USER_LOGIN_REDIRECT;
      }

      if (error.response?.status === 403) {
        console.warn(`User access denied or blocked. Logging out...`);
        store.dispatch(userLogout({ isLoggedIn: false }));
        localStorage.removeItem(USER_ACCESS_TOKEN_KEY);
        localStorage.removeItem(USER_REFRESH_TOKEN_KEY);
        window.location.href = USER_LOGIN_REDIRECT;
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default createUserApiClient;
