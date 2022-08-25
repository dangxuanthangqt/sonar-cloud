import { rest } from 'msw';
import { API_URL } from 'services/constant';
import { API_MOCK_DELAY } from '@/common/constants';
import { generatedReports, categorizationData } from './mockData';

const data = generatedReports();
const categorizationRes = Array.from(
  { length: 7 },
  (__, idx1) => categorizationData
);

const getDataReports = rest.get(`${API_URL}api/reports`, (req, res, ctx) => {
  const page = req.url.searchParams.get('page') || 1;

  const itemData = data?.[page - 1];
  const itemDataCategory = categorizationRes?.[page - 1];

  return res(
    ctx.delay(1000),
    ctx.json({ reportData: itemData, categorizationData: itemDataCategory })
  );
});

const updateCategorization = rest.put(
  `${API_URL}api/reports/:page`,
  (req, res, ctx) => {
    const { page } = req.params;
    return res(ctx.delay(1000), ctx.json({}));
  }
);

export const requestReportsHandler = [getDataReports, updateCategorization];
