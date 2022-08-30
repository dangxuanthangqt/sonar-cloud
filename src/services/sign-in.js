import request from './request';

export const signIn = (payload) => request.put(`/api/v1/sign-in`, payload);
