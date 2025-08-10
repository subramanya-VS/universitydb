import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + '/',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});


// Request interceptor to attach access token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// **Put your response interceptor here, immediately after**:
api.interceptors.response.use(
  res => res,
  async err => {
    const orig = err.config;
    if (err.response?.status === 401 && !orig._retry) {
      orig._retry = true;
      try {
        const { data } = await api.post('/refresh');
        if (data.accessToken) {
          localStorage.setItem('token', data.accessToken);
          orig.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(orig);
        }
      } catch (_) { /* failed to refresh */ }
    }
    return Promise.reject(err);
  }
);
