import { store } from '@/store';
import { apiClient } from './axios.instance';
import { logoutAction } from '@/redux/slice/auth.slice';

/* ================= REQUEST ================= */

apiClient.interceptors.request.use(
  config => {
    const token = store.getState().auth?.access_token;

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

/* ================= RESPONSE ================= */

apiClient.interceptors.response.use(
  res => res,
  async error => {
    const status = error.response?.status;

    if (status === 401) {
      store.dispatch(logoutAction());
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
