import request from './request';

export const signIn = (payload) => request.post(`/api/v1/login`, payload);
