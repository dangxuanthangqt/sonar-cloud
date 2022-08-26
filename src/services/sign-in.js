import request from './request';

export const signIn = () => request.put(`/api/v1/sign-in`);
