import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/resumes', 
});

export const uploadResume = (formData) => API.post('/upload', formData);
export const getResumeById = (id) => API.get(`/${id}`);
export const getAllResumes = () => API.get('/');
export const deleteResumeById = (id) => API.delete(`/${id}`);