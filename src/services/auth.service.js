import { api } from './api';

export const authService = {
  async register(name, email, password) {
    const res = await api.post('/auth/register', { name, email, password });
    if (res.data.accessToken) {
      localStorage.setItem('resumeiq_token', res.data.accessToken);
      localStorage.setItem('resumeiq_refresh_token', res.data.refreshToken);
      localStorage.setItem('resumeiq_user', JSON.stringify(res.data.user));
    }
    return res.data;
  },

  async login(email, password) {
    const res = await api.post('/auth/login', { email, password });
    if (res.data.accessToken) {
      localStorage.setItem('resumeiq_token', res.data.accessToken);
      localStorage.setItem('resumeiq_refresh_token', res.data.refreshToken);
      localStorage.setItem('resumeiq_user', JSON.stringify(res.data.user));
    }
    return res.data;
  },

  async getCurrentUser() {
    const res = await api.get('/auth/me');
    return res.data;
  },

  async forgotPassword(email) {
    const res = await api.post('/auth/forgot-password', { email });
    return res.data;
  },

  async logout() {
    const refreshToken = localStorage.getItem('resumeiq_refresh_token');
    try {
      if (refreshToken) {
        await api.post('/auth/logout', { refreshToken });
      }
    } finally {
      localStorage.removeItem('resumeiq_token');
      localStorage.removeItem('resumeiq_refresh_token');
      localStorage.removeItem('resumeiq_user');
    }
  },
};
