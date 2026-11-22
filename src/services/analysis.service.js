import { api } from './api';

export const analysisService = {
  async createAnalysis(resumeId, jobDescriptionId = null) {
    const res = await api.post('/analyses', { resumeId, jobDescriptionId });
    return res.data;
  },

  async getAnalyses() {
    const res = await api.get('/analyses');
    return res.data;
  },

  async getAnalysisById(id) {
    const res = await api.get(`/analyses/${id}`);
    return res.data;
  },

  async compareResumes(resumeId1, resumeId2, jobDescriptionId = null) {
    const res = await api.post('/analyses/compare', {
      resumeId1,
      resumeId2,
      jobDescriptionId,
    });
    return res.data;
  },

  async getDashboardStats() {
    const res = await api.get('/analyses/dashboard-stats');
    return res.data;
  },

  getReportPdfUrl(id) {
    return `${api.defaults.baseURL}/analyses/${id}/report/pdf`;
  },
};
