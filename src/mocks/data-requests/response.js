import { rest } from 'msw';
import { API_URL } from 'services/constant';
import { API_MOCK_DELAY } from '@/common/constants';
// import { faker } from '@faker-js/faker';
import dataRequestSchema from './schema.json';

export const getDataRequestSchema = rest.get(
  `${API_URL}api/v1/data-requests/schema`,
  (_, res, ctx) => res(ctx.delay(API_MOCK_DELAY), ctx.json(dataRequestSchema))
);

export const getDataRequest = rest.get(
  `${API_URL}api/v1/request/:requestId`,
  (_, res, ctx) =>
    res(
      ctx.delay(API_MOCK_DELAY),
      ctx.json({
        id: 50,
        title: 'Request 1 Title',
        formSections: [
          {
            id: 1,
            name: 'Data Sources',
            description: 'Data Sources description',
            helpText: 'Data Sources help',
            subSections: null,
            formGroups: [
              {
                id: 1,
                name: 'Field Reports',
                helpText: 'Field Reports help',
                dataSources: [
                  {
                    id: 1,
                    name: 'Uncodable Claim Narrative (UCN)',
                    value: true,
                  },
                  {
                    id: 2,
                    name: 'Dealer Problem sampling System (DPS)',
                    value: false,
                  },
                  {
                    id: 8,
                    name: 'Fast Feedback Narrative (FAS)',
                    value: false,
                  },
                  {
                    id: 3,
                    name: 'Straight Time Claim Narrative (STN)',
                    value: false,
                  },
                  {
                    id: 4,
                    name: 'Digital Imaging Pre-Auth (DPA)',
                    value: false,
                  },
                  {
                    id: 5,
                    name: 'CAGRIS Field Concern Report (CAG)',
                    value: false,
                  },
                  {
                    id: 6,
                    name: 'CAGRIS Field Concern Report (CAG)',
                    value: false,
                  },
                  {
                    id: 7,
                    name: 'PE and Lease Vehicle Narrative (LSE)',
                    value: false,
                  },
                ],
              },
              {
                id: 2,
                name: 'Customer Complaints',
                helpText: 'Customer Complaints help',
                dataSources: [
                  {
                    id: 1,
                    name: 'Customer assistance Inquiry Reports',
                    value: false,
                  },
                ],
              },
              {
                id: 3,
                name: 'Dealer Visits',
                helpText: 'Dealer Visits help',
                dataSources: [
                  {
                    id: 1,
                    name: 'Dealer Repiar Orders',
                    value: false,
                  },
                ],
              },
              {
                id: 4,
                name: 'Recalls',
                helpText: 'Recalls help',
                dataSources: [
                  {
                    id: 1,
                    name: 'Recall Data (Only Launched Recalls)',
                    value: false,
                  },
                ],
              },
              {
                id: 5,
                name: 'STAR/Cherwel',
                helpText: 'STAR/Cherwel help',
                dataSources: [
                  {
                    id: 1,
                    name: 'Star Report',
                    value: false,
                  },
                  {
                    id: 2,
                    name: 'Cherwell STAR Report',
                    value: false,
                  },
                ],
              },
              {
                id: 6,
                name: 'Surverys',
                helpText: 'Surverys help',
                dataSources: [
                  {
                    id: 1,
                    name: 'Customer Promoter Score (CPS)',
                    value: false,
                  },
                  {
                    id: 2,
                    name: 'Continuous Quality Insight (CQI)',
                    value: false,
                  },
                ],
              },
              {
                id: 7,
                name: 'Vehicle Inspections',
                helpText: 'Vehicle Inspections',
                dataSources: [
                  {
                    id: 1,
                    name: 'Inspections',
                    value: false,
                  },
                ],
              },
              {
                id: 8,
                name: 'Vehicle Volume',
                helpText: 'Vehicle Volume help',
                dataSources: [
                  {
                    id: 1,
                    name: 'Vehicle Volume (Production)',
                    value: false,
                  },
                ],
              },
              {
                id: 9,
                name: 'Warranty',
                helpText: 'Warranty help',
                dataSources: [
                  {
                    id: 1,
                    name: 'Warranty Claims',
                    value: false,
                  },
                ],
              },
            ],
          },
        ],
      })
    )
);

export const updateDataRequest = rest.put(
  `${API_URL}api/v1/request/:requestId`,
  (_, res, ctx) => res(ctx.delay(API_MOCK_DELAY))
);
