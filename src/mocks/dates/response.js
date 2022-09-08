import { rest } from 'msw';
import { API_URL } from 'services/constant';
import { API_MOCK_DELAY } from '@/common/constants';

export const createDatesRequest = rest.post(
  `${API_URL}api/requests/dates`,
  (req, res, ctx) => {
    return res(
      ctx.delay(API_MOCK_DELAY),
      ctx.json('Create sale dates request successfully')
    );
  }
);

export const datesHandler = [createDatesRequest];
