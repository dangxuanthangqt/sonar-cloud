import { rest } from 'msw';
import { API_URL } from 'services/constant';
import { API_MOCK_DELAY } from '@/common/constants';

export const signIn = rest.put(`${API_URL}api/v1/sign-in`, (_, res, ctx) =>
  res(ctx.delay(API_MOCK_DELAY), ctx.json(true))
);
