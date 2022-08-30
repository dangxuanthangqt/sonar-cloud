import { rest } from 'msw';
import { API_URL } from 'services/constant';
import { faker } from '@faker-js/faker';
import { API_MOCK_DELAY } from '@/common/constants';

const mockTemplates = [
  {
    template: {
      id: 1,
      title: 'Load From Template',
      permission: {
        readOnlyControl: false,
      },
      url: `${API_URL}api/keywords_templates`,
      requestType: 'GET',
      value: 'Template 1',
    },
    criteriaGroup: {
      id: 1,
      title: 'Criteria',
      helpText: 'Keywords criteria to filter the data sources',
      permission: {
        readOnlyControl: false,
      },
      keyWordsCriteria: [
        {
          sequence: 1,
          criteria: {
            id: 1,
            title: 'Criteria',
            url: `${API_URL}api/keywords_criteria`,
            requestType: 'GET',
            value: 'Include : if match all',
            permission: {
              readOnlyControl: true,
            },
          },
          keywords: {
            title: 'Keywords',
            values: ['fire', 'engine'],
            permission: {
              readOnlyControl: true,
            },
          },
        },
        {
          sequence: 2,
          criteria: {
            id: 1,
            title: 'Criteria',
            url: `${API_URL}api/keywords_criteria`,
            requestType: 'GET',
            value: 'Include : if match any',
          },
          keywords: {
            title: 'Keywords',
            values: ['safety', 'risk', 'fatal'],
          },
          andOr: 'AND',
        },
      ],
    },
  },
  {
    template: {
      title: 'Load From Template',
      id: faker.database.mongodbObjectId(),
      url: `${API_URL}api/keywords_templates`,
      requestType: 'GET',
      value: 'Template 4',
    },
    criteriaGroup: {
      id: faker.database.mongodbObjectId(),
      title: 'Criteria',
      helpText: faker.random.words(5),
      permission: {
        readOnlyControl: faker.datatype.boolean(),
      },
      keyWordsCriteria: [
        {
          sequence: 1,
          criteria: {
            id: faker.database.mongodbObjectId(),
            title: 'Criteria',
            url: `${API_URL}api/keywords_criteria`,
            requestType: 'GET',
            value: 'Include : if match any',
            permission: {
              readOnlyControl: faker.datatype.boolean(),
            },
          },
          keywords: {
            title: 'Keywords',
            values: Array(10)
              .fill(1)
              .map(() => faker.unique(faker.random.word)),
            permission: {
              readOnlyControl: faker.datatype.boolean(),
            },
          },
        },
      ],
    },
  },
  {
    template: {
      title: 'Load From Template',
      id: faker.database.mongodbObjectId(),
      url: `${API_URL}api/keywords_templates`,
      requestType: 'GET',
      value: 'Template 2',
    },
    criteriaGroup: {
      id: faker.database.mongodbObjectId(),
      title: 'Criteria',
      helpText: faker.random.words(5),
      permission: {
        readOnlyControl: faker.datatype.boolean(),
      },
      keyWordsCriteria: [
        {
          sequence: 1,
          criteria: {
            id: faker.database.mongodbObjectId(),
            title: 'Criteria',
            url: `${API_URL}api/keywords_criteria`,
            requestType: 'GET',
            value: 'Include : if match any',
            permission: {
              readOnlyControl: faker.datatype.boolean(),
            },
          },
          keywords: {
            title: 'Keywords',
            values: Array(7)
              .fill(1)
              .map(() => faker.unique(faker.random.word)),
            permission: {
              readOnlyControl: faker.datatype.boolean(),
            },
          },
        },
      ],
    },
  },
  {
    template: {
      title: 'Load From Template',
      id: faker.database.mongodbObjectId(),
      url: `${API_URL}api/keywords_templates`,
      requestType: 'GET',
      value: 'Template 3',
    },
    criteriaGroup: {
      id: faker.database.mongodbObjectId(),
      title: 'Criteria',
      helpText: faker.random.words(5),
      permission: {
        readOnlyControl: faker.datatype.boolean(),
      },
      keyWordsCriteria: [
        {
          sequence: 1,
          criteria: {
            id: faker.database.mongodbObjectId(),
            title: 'Criteria',
            url: `${API_URL}api/keywords_criteria`,
            requestType: 'GET',
            value: 'Include : if match any',
            permission: {
              readOnlyControl: faker.datatype.boolean(),
            },
          },
          keywords: {
            title: 'Keywords',
            values: Array(5)
              .fill(1)
              .map(() => faker.unique(faker.random.word)),
            permission: {
              readOnlyControl: faker.datatype.boolean(),
            },
          },
        },
      ],
    },
  },
];

const getKeywordsTemplates = rest.get(
  `${API_URL}api/keywords_templates`,
  (req, res, ctx) => {
    const q = req.url.searchParams.get('q')?.toLowerCase();
    return res(
      ctx.delay(API_MOCK_DELAY),
      ctx.json({
        data: q
          ? mockTemplates.filter(
              (el) =>
                new RegExp(q, 'i').test(el.template.title) ||
                new RegExp(q, 'i').test(el.template.value)
            )
          : mockTemplates,
      })
    );
  }
);

// export const getDataRequestSchema = rest.get(
//   `${API_URL}api/v1/data-requests/schema`,
//   (_, res, ctx) => res(ctx.delay(API_MOCK_DELAY), ctx.json(dataRequestSchema))
// );

export const updateKeywordRequest = rest.put(
  `${API_URL}api/keywords_templates`,
  (_, res, ctx) => res(ctx.delay(API_MOCK_DELAY))
);

export const keywordsHandler = [getKeywordsTemplates];
