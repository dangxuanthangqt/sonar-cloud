import { rest } from 'msw';
import { API_URL } from 'services/constant';
import { API_MOCK_DELAY } from '@/common/constants';

export const getAllDataSources = rest.get(
  `${API_URL}api/dataSources`,
  (_, res, ctx) => {
    return res(
      ctx.delay(API_MOCK_DELAY),
      ctx.json({
        dataSourceGroups: [
          {
            id: 1,
            title: 'Field Reports',
            dataSources: [
              {
                id: 1,
                title: 'Uncodable Claim Narrative (UCN)',
                value: false,
                requiredFor: ['keywords', 'saleCodes', 'dates'],
                optionalFor: ['customFields'],
                notApplicableFor: ['vehicles', 'lopsParts'],
              },
              {
                id: 2,
                title: 'Dealer Problem sampling System (DPS)',
                value: false,
                requiredFor: ['keywords', 'saleCodes', 'dates'],
                optionalFor: ['vehicles', 'lopsParts'],
                notApplicableFor: ['customFields'],
              },
              {
                id: 3,
                title: 'Fast Feedback Narrative (FAS)',
                value: false,
                requiredFor: ['customFields'],
                optionalFor: ['vehicles', 'lopsParts'],
                notApplicableFor: ['keywords', 'saleCodes', 'dates'],
              },
              {
                id: 4,
                title: 'Straight Time Claim Narrative (STN)',
                value: false,
                requiredFor: ['vehicles', 'lopsParts'],
                optionalFor: ['keywords', 'saleCodes', 'dates'],
                notApplicableFor: ['customFields'],
              },
              {
                id: 5,
                title: 'Digital Imaging Pre-Auth (DPA)',
                value: false,
                requiredFor: ['vehicles', 'lopsParts'],
                optionalFor: ['customFields'],
                notApplicableFor: ['keywords', 'saleCodes', 'dates'],
              },
              {
                id: 6,
                title: 'CAGRIS Field Concern Report (CAG)',
                value: false,
                requiredFor: ['customFields'],
                optionalFor: ['keywords', 'saleCodes', 'dates'],
                notApplicableFor: ['vehicles', 'lopsParts'],
              },
              {
                id: 7,
                title: 'PE and Lease Vehicle Narrative (LSE)',
                value: false,
                requiredFor: ['vehicles', 'lopsParts'],
                optionalFor: ['customFields'],
                notApplicableFor: ['keywords', 'saleCodes', 'dates'],
              },
            ],
          },
          {
            id: 2,
            title: 'Customer Complaints',
            dataSources: [
              {
                id: 1,
                title: 'Customer assistance Inquiry Reports',
                value: false,
                requiredFor: ['customFields'],
                optionalFor: ['keywords', 'saleCodes', 'dates'],
                notApplicableFor: ['vehicles', 'lopsParts'],
              },
            ],
          },
          {
            id: 3,
            title: 'Dealer Visits',
            dataSources: [
              {
                id: 1,
                title: 'Dealer Repair Orders',
                value: false,
                requiredFor: ['keywords', 'saleCodes', 'dates'],
                optionalFor: ['vehicles', 'lopsParts'],
                notApplicableFor: ['customFields'],
              },
            ],
          },
          {
            id: 4,
            title: 'Recalls',
            dataSources: [
              {
                id: 1,
                title: 'Recall Data (Only Launched Recalls)',
                value: false,
                requiredFor: ['customFields'],
                optionalFor: ['vehicles', 'lopsParts'],
                notApplicableFor: ['keywords', 'saleCodes', 'dates'],
              },
            ],
          },
          {
            id: 5,
            title: 'STAR/Cherwel',
            dataSources: [
              {
                id: 1,
                title: 'Star Report',
                value: false,
                requiredFor: ['keywords', 'saleCodes', 'dates'],
                optionalFor: ['customFields'],
                notApplicableFor: ['vehicles', 'lopsParts'],
              },
              {
                id: 2,
                title: 'Cherwell STAR Report',
                value: false,
                requiredFor: ['customFields'],
                optionalFor: ['vehicles', 'lopsParts'],
                notApplicableFor: ['keywords', 'saleCodes', 'dates'],
              },
            ],
          },
          {
            id: 6,
            title: 'Surverys',
            dataSources: [
              {
                id: 1,
                title: 'Customer Promoter Score (CPS)',
                value: false,
                requiredFor: ['keywords', 'saleCodes', 'dates'],
                optionalFor: ['vehicles', 'lopsParts'],
                notApplicableFor: ['customFields'],
              },
              {
                id: 2,
                title: 'Continuous Quality Insight (CQI)',
                value: false,
                requiredFor: ['vehicles', 'lopsParts'],
                optionalFor: ['customFields'],
                notApplicableFor: ['keywords', 'saleCodes', 'dates'],
              },
            ],
          },
          {
            id: 7,
            title: 'Inspections',
            dataSources: [
              {
                id: 1,
                title: 'Vehicle Inspections',
                value: false,
                requiredFor: ['customFields'],
                optionalFor: ['vehicles', 'lopsParts'],
                notApplicableFor: ['keywords', 'saleCodes', 'dates'],
              },
            ],
          },
          {
            id: 8,
            title: 'Vehicle Volume',
            dataSources: [
              {
                id: 1,
                title: 'Vehicle Volume (Production)',
                value: false,
                requiredFor: ['customFields'],
                optionalFor: ['keywords', 'saleCodes', 'dates'],
                notApplicableFor: ['vehicles', 'lopsParts'],
              },
            ],
          },
          {
            id: 9,
            title: 'Warranty',
            dataSources: [
              {
                id: 1,
                title: 'Warranty Claims',
                value: false,
                requiredFor: ['customFields'],
                optionalFor: ['vehicles', 'lopsParts'],
                notApplicableFor: ['keywords', 'saleCodes', 'dates'],
              },
            ],
          },
        ],
      })
    );
  }
);

export const createDataSources = rest.post(
  `${API_URL}api/dataSources`,
  (_, res, ctx) => {
    return res(
      ctx.delay(API_MOCK_DELAY),
      ctx.json('Create data source successfully')
    );
  }
);

export const dataSourceHandler = [getAllDataSources, createDataSources];
