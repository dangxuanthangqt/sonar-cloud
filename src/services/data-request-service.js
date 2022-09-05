import request from './request';

export const getDataRequestSchema = () =>
  request.get('/api/v1/data-requests/schema');

export const getDataRequest = ({ requestId, params }) =>
  request.get(`/api/v1/request/${requestId}`, { params });

export const updateDataRequest = ({ requestId, data }) =>
  request.put(`/api/v1/request/${requestId}`, data);

export const updateKeywordRequest = ({ requestId, data }) =>
  request.put(`/api/v1/request/${requestId}`, data);

export const createKeywordRequest = (payload) =>
  request.post(`api/requests/keywords`, payload);

export const createNewVehicleRequest = (payload) =>
  request.post(`api/requests/vehicles`, payload);
