import axios from 'axios';
import humps from 'humps';
import { API_URL } from './constant';

const request = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

request.interceptors.request.use((config) => {
  return {
    ...config,
    // ...(config.data && {
    //   data: config.url.includes(originalDataReq)
    //     ? config.data
    //     : humps.decamelizeKeys(config.data),
    // }),
    ...(config.params && { params: humps.decamelizeKeys(config.params) }),
  };
});

request.interceptors.response.use(
  (response) => {
    return {
      ...response,
      data: originalDataRes.includes(response.config.url)
        ? response.data
        : humps.camelizeKeys(response.data, (key, convert) =>
            /^(\w+)-(\w)([\w-]*)/gm.test(key) ? key : convert(key)
          ),
    };
  },
  (error) => Promise.reject(error.response)
);

export default request;

const originalDataRes = ['/api/reports'];

const originalDataReq = '/api/reports';
