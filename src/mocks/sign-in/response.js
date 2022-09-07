import { rest } from 'msw';
import { API_URL } from 'services/constant';
import { API_MOCK_DELAY } from '@/common/constants';

const loginResponse = (username) => {
  return {
    tokenType: 'bearer',
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6pXVCJ9.eyJpc3MiOiJodHRwOi8vbWFsdGE6NTY5MDAiLCJzdWIiOiJW5l2w1bRxU',
    expiresIn: 900,
    username,
  };
};

export const signIn = rest.post(`${API_URL}api/v1/login`, (_, res, ctx) =>
  res(ctx.delay(API_MOCK_DELAY), ctx.json(loginResponse(_.body.username)))
);
