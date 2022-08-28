import request from './request';

export const signUp = () => request.put(`/api/v1/sign-up`);
