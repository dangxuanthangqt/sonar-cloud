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
                requiredFor: ['VEHICLES', 'LOPS_PARTS'],
                optionalFor: ['KEYWORDS', 'SALES_CODES', 'DATES'],
                notApplicableFor: ['CUSTOM_FIELDS'],
              },
              {
                id: 2,
                title: 'Dealer Problem sampling System (DPS)',
                value: false,
                requiredFor: ['KEYWORDS', 'SALES_CODES', 'DATES'],
                optionalFor: ['VEHICLES', 'LOPS_PARTS'],
                notApplicableFor: ['CUSTOM_FIELDS'],
              },
              {
                id: 3,
                title: 'Fast Feedback Narrative (FAS)',
                value: false,
                requiredFor: ['KEYWORDS', 'SALES_CODES', 'DATES'],
                optionalFor: ['CUSTOM_FIELDS'],
                notApplicableFor: ['VEHICLES', 'LOPS_PARTS'],
              },
              {
                id: 4,
                title: 'Straight Time Claim Narrative (STN)',
                value: false,
                requiredFor: ['VEHICLES', 'LOPS_PARTS'],
                optionalFor: ['KEYWORDS', 'SALES_CODES', 'DATES'],
                notApplicableFor: ['CUSTOM_FIELDS'],
              },
              {
                id: 5,
                title: 'Digital Imaging Pre-Auth (DPA)',
                value: false,
                requiredFor: ['VEHICLES', 'LOPS_PARTS'],
                optionalFor: ['CUSTOM_FIELDS'],
                notApplicableFor: ['KEYWORDS', 'SALES_CODES', 'DATES'],
              },
              {
                id: 6,
                title: 'CAGRIS Field Concern Report (CAG)',
                value: false,
                requiredFor: ['VEHICLES', 'LOPS_PARTS'],
                optionalFor: ['CUSTOM_FIELDS'],
                notApplicableFor: ['KEYWORDS', 'SALES_CODES', 'DATES'],
              },
              {
                id: 7,
                title: 'PE and Lease Vehicle Narrative (LSE)',
                value: false,
                requiredFor: ['VEHICLES', 'LOPS_PARTS'],
                optionalFor: ['KEYWORDS', 'SALES_CODES', 'DATES'],
                notApplicableFor: ['CUSTOM_FIELDS'],
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
                requiredFor: ['KEYWORDS', 'SALES_CODES', 'DATES'],
                optionalFor: ['CUSTOM_FIELDS'],
                notApplicableFor: ['VEHICLES', 'LOPS_PARTS'],
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
                requiredFor: ['CUSTOM_FIELDS'],
                optionalFor: ['KEYWORDS', 'SALES_CODES', 'DATES'],
                notApplicableFor: ['VEHICLES', 'LOPS_PARTS'],
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
                requiredFor: ['CUSTOM_FIELDS'],
                optionalFor: ['KEYWORDS', 'SALES_CODES', 'DATES'],
                notApplicableFor: ['VEHICLES', 'LOPS_PARTS'],
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
                requiredFor: ['KEYWORDS', 'SALES_CODES', 'DATES'],
                optionalFor: ['VEHICLES', 'LOPS_PARTS'],
                notApplicableFor: ['CUSTOM_FIELDS'],
              },
              {
                id: 2,
                title: 'Cherwell STAR Report',
                value: false,
                requiredFor: ['CUSTOM_FIELDS'],
                optionalFor: ['VEHICLES', 'LOPS_PARTS'],
                notApplicableFor: ['KEYWORDS', 'SALES_CODES', 'DATES'],
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
                requiredFor: ['CUSTOM_FIELDS'],
                optionalFor: ['VEHICLES', 'LOPS_PARTS'],
                notApplicableFor: ['KEYWORDS', 'SALES_CODES', 'DATES'],
              },
              {
                id: 2,
                title: 'Continuous Quality Insight (CQI)',
                value: false,
                requiredFor: ['VEHICLES', 'LOPS_PARTS'],
                optionalFor: ['KEYWORDS', 'SALES_CODES', 'DATES'],
                notApplicableFor: ['CUSTOM_FIELDS'],
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
                requiredFor: ['KEYWORDS', 'SALES_CODES', 'DATES'],
                optionalFor: ['VEHICLES', 'LOPS_PARTS'],
                notApplicableFor: ['CUSTOM_FIELDS'],
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
                requiredFor: ['CUSTOM_FIELDS'],
                optionalFor: ['VEHICLES', 'LOPS_PARTS'],
                notApplicableFor: ['KEYWORDS', 'SALES_CODES', 'DATES'],
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
                requiredFor: ['CUSTOM_FIELDS'],
                optionalFor: ['KEYWORDS', 'SALES_CODES', 'DATES'],
                notApplicableFor: ['VEHICLES', 'LOPS_PARTS'],
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
      ctx.json({
        requestId: '9876543210',
        sectionCompleted: 'DATASOURCES',
      })
    );
  }
);

export const dataSourceHandler = [getAllDataSources, createDataSources];
