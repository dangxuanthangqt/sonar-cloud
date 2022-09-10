import { rest } from 'msw';
import { API_URL } from 'services/constant';
import { API_MOCK_DELAY } from '@/common/constants';

export const createSalesCodeRequest = rest.post(
  `${API_URL}api/requests/sales-code`,
  (req, res, ctx) => {
    return res(
      ctx.delay(API_MOCK_DELAY),
      ctx.json('Create sale code request successfully')
    );
  }
);

export const salesCodeHandler = [createSalesCodeRequest];
