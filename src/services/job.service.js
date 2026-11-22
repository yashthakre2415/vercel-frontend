import { api } from './api';

export const jobService = {
  async createJob(data) {
    const res = await api.post('/jobs', data);
    return res.data;
  },

  async getJobs() {
    const res = await api.get('/jobs');
    return res.data;
  },

  async getJobById(id) {
    const res = await api.get(`/jobs/${id}`);
    return res.data;
  },

  async deleteJob(id) {
    const res = await api.delete(`/jobs/${id}`);
    return res.data;
  },
};
