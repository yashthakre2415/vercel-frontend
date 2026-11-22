import { api } from './api';

export const resumeService = {
  async uploadFile(file, title = '') {
    const formData = new FormData();
    formData.append('file', file);
    if (title) formData.append('title', title);

    const res = await api.post('/resumes/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  async uploadText(rawText, title = '') {
    const res = await api.post('/resumes/upload', { rawText, title });
    return res.data;
  },

  async getResumes() {
    const res = await api.get('/resumes');
    return res.data;
  },

  async getResumeById(id) {
    const res = await api.get(`/resumes/${id}`);
    return res.data;
  },

  async updateResume(id, data) {
    const res = await api.put(`/resumes/${id}`, data);
    return res.data;
  },

  async deleteResume(id) {
    const res = await api.delete(`/resumes/${id}`);
    return res.data;
  },

  async optimizeResume(resumeId, jobDescriptionId = null, saveAsNewVersion = true) {
    const res = await api.post('/resumes/optimize', {
      resumeId,
      jobDescriptionId,
      saveAsNewVersion,
    });
    return res.data;
  },

  async rewriteBullet(bullet, targetSkill = '') {
    const res = await api.post('/resumes/rewrite-bullet', { bullet, targetSkill });
    return res.data;
  },

  getDownloadDocxUrl(id) {
    return `${api.defaults.baseURL}/resumes/${id}/download/docx`;
  },

  getDownloadPdfUrl(id) {
    return `${api.defaults.baseURL}/resumes/${id}/download/pdf`;
  },
};
