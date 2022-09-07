import request from './request';

export const getAllDataSources = () => request.get(`/api/dataSources`);

export const createDataSourceRequest = (data) =>
  request.post('/api/dataSources', data);
