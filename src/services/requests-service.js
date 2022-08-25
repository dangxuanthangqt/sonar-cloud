import request from './request';

export const getRequestView = () => request.get('/api/requests/schema');

export const getRequestViewData = () => request.get(`/api/requests/view`);

export const getRequestViewDataGrid = (params) =>
  request.get(`/api/requests/data-grid`, { params });

export const getDataByCode = (params, url) =>
  request.get(url, { params, baseURL: '' });

export const getValuesByLookUpCode = (params) =>
  request.get(`/api/lookups/values`, { params });

export const getDataReports = (params) =>
  request.get(`/api/reports`, { params });

export const updateCategorization = ({ page, data }) =>
  request.put(`/api/reports/${page}`, data);
