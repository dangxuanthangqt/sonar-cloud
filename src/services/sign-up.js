import request from './request';

export const signUp = (payload) => request.put(`/api/v1/sign-up`, payload);
