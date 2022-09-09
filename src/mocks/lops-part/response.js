import { rest } from 'msw';
import { API_URL } from 'services/constant';
import { API_MOCK_DELAY } from '@/common/constants';

export const createLopsPartRequest = rest.post(
  `${API_URL}api/requests/lops-part`,
  (req, res, ctx) => {
    return res(
      ctx.delay(API_MOCK_DELAY),
      ctx.json('Create lops part request successfully')
    );
  }
);

export const lopsPartHandler = [createLopsPartRequest];
