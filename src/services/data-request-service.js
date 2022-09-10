import request from './request';

export const getDataRequestSchema = () =>
  request.get('/api/v1/data-requests/schema');

export const getDataRequest = ({ requestId, params }) =>
  request.get(`/api/v1/request/${requestId}`, { params });

export const updateDataRequest = ({ requestId, data }) =>
  request.put(`/api/v1/request/${requestId}`, data);

export const updateKeywordRequest = ({ requestId, data }) =>
  request.put(`/api/v1/request/${requestId}`, data);

export const createKeywordRequest = (id, payload) =>
  request.post(`api/requests/${id}/keywords`, payload);

export const createNewVehicleRequest = (payload) =>
  request.post(`api/requests/vehicles`, payload);

export const createSalesCodeRequest = (payload) =>
  request.post(`api/requests/sales-code`, payload);

export const createDatesRequest = (payload) =>
  request.post(`api/requests/dates`, payload);

export const createLopsPartRequest = (payload) =>
  request.post(`api/requests/lops-part`, payload);
