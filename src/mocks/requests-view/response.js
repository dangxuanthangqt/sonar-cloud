import { rest } from 'msw';
import { API_URL } from 'services/constant';
import { faker } from '@faker-js/faker';
import { orderBy } from 'lodash';
import requestsViewModal from './schema.json';
import { API_MOCK_DELAY } from '@/common/constants';
import { handleRegexWithSpecialCharacters } from '@/common/utils';
import { dataGrid, generateDataSourceSummary } from './mockData';

const getRequestsViewSchema = rest.get(
  `${API_URL}api/requests/schema`,
  (_, res, ctx) => res(ctx.delay(API_MOCK_DELAY), ctx.json(requestsViewModal))
);

const getRequestsViewData = rest.get(
  `${API_URL}api/requests/view`,
  (_, res, ctx) =>
    res(
      ctx.delay(API_MOCK_DELAY),
      ctx.json({
        id: 1,
        title: '2022 new safety issues',
        helpText: 'Help Text',
        dataSourceSection: {
          id: 1,
          title: 'Data Source',
          dataSourceGroups: [
            {
              id: 1,
              title: 'Field Reports',
              dataSources: [
                {
                  id: 1,
                  title: 'Uncodable Claim Narrative (UCN)',
                  value: false,
                  ...generateDataSourceSummary(),
                },
                {
                  id: 2,
                  title: 'Dealer Problem sampling System (DPS)',
                  // permission: {
                  //   readOnlyControl: true,
                  // },
                  value: false,
                  ...generateDataSourceSummary(),
                },
                {
                  id: 3,
                  title: 'Fast Feedback Narrative (FAS)',
                  value: false,
                  ...generateDataSourceSummary(),
                },
                {
                  id: 4,
                  title: 'Straight Time Claim Narrative (STN)',
                  value: false,
                  ...generateDataSourceSummary(),
                },
                {
                  id: 5,
                  title: 'Digital Imaging Pre-Auth (DPA)',
                  value: false,
                  ...generateDataSourceSummary(),
                },
                {
                  id: 6,
                  title: 'CAGRIS Field Concern Report (CAG)',
                  value: false,
                  ...generateDataSourceSummary(),
                },
                {
                  id: 7,
                  title: 'PE and Lease Vehicle Narrative (LSE)',
                  // permission: {
                  //   readOnlyControl: true,
                  // },
                  value: false,
                  ...generateDataSourceSummary(),
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
                  ...generateDataSourceSummary(),
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
                  ...generateDataSourceSummary(),
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
                  ...generateDataSourceSummary(),
                },
              ],
            },
            {
              id: 5,
              title: 'STAR/Cherwel',
              // permission: {
              //   readOnlyControl: true,
              // },
              dataSources: [
                {
                  id: 1,
                  title: 'Star Report',
                  // permission: {
                  //   readOnlyControl: true,
                  // },
                  value: false,
                  ...generateDataSourceSummary(),
                },
                {
                  id: 2,
                  title: 'Cherwell STAR Report',
                  value: false,
                  ...generateDataSourceSummary(),
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
                  ...generateDataSourceSummary(),
                },
                {
                  id: 2,
                  title: 'Continuous Quality Insight (CQI)',
                  value: false,
                  ...generateDataSourceSummary(),
                },
              ],
            },
            {
              id: 7,
              title: 'Inspections',
              // permission: {
              //   readOnlyControl: true,
              // },
              dataSources: [
                {
                  id: 1,
                  title: 'Vehicle Inspections',
                  value: false,
                  ...generateDataSourceSummary(),
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
                  ...generateDataSourceSummary(),
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
                  ...generateDataSourceSummary(),
                },
              ],
            },
          ],
        },
        keyWordSection: {
          id: 6,
          title: 'Keywords',
          helpText: 'Filter the data sources by keywords',
          hints:
            'Include: If match all: Only if all the Keywords/Phrases in this group matches, then the document will be included in the result.\nInclude: If match any: If any of the Keyword./Phrase in this group matches, then the document will be included in the result.\nExclude: If match all: Only if all the Keyword./Phrase in this group matches, then the document will be excluded in the result.\nExclude: If match any: If any of the Keyword./Phrase in this group matches, then the document will be excluded in the result.',
          optionsGroup: {
            id: 1,
            title: 'Options',
            helpText: 'Keywords options',
            template: {
              id: 1,
              title: 'Load From Template',
              // permission: {
              //   readOnlyControl: false,
              // },
              url: `${API_URL}api/keywords_templates`,
              requestType: 'GET',
              value: 'Template 1',
            },
            isExactMatch: {
              id: 1,
              title: 'Exact Match',
              helpText: 'Uncheck if similar keywords matching is required',
              value: false,
            },
          },
          criteriaGroup: {
            id: 1,
            title: 'Criteria',
            helpText: 'Keywords criteria to filter the data sources',
            // permission: {
            //   readOnlyControl: false,
            // },
            keyWordsCriteria: [
              {
                sequence: 1,
                criteria: {
                  id: 1,
                  title: 'Criteria',
                  url: `${API_URL}api/keywords_criteria`,
                  requestType: 'GET',
                  value: 'Include : if match all',
                },
                keywords: {
                  title: 'Keywords',
                  values: ['fire', 'engine'],
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
                logicalOperator: 'AND',
              },
            ],
          },
        },
        vehicleSection: {
          id: 1,
          title: 'Vehicles',
          plantGroup: {
            id: 1,
            title: 'Plant',
            plant: {
              url: `${API_URL}api/common_code`,
              parameters: {
                codeType: 'PLANT',
              },
              requestType: 'GET',
              values: ['Detroit Assembly Plant', 'Assembly 2'],
            },
          },
          vehicleCriteriaGroup: {
            vehicleCriteriaList: [
              {
                id: 1,
                fromYear: {
                  id: 1,
                  value: 2020,
                },
                toYear: {
                  id: 2,
                  value: 2022,
                },
                family: {
                  id: 3,
                  url: `${API_URL}api/familyCode`,
                  parameters: {
                    q: '{value}',
                  },
                  requestType: 'GET',
                  value: 'AA',
                },
                line: {
                  id: 4,
                  url: `${API_URL}api/lineCode`,
                  parameters: {
                    q: '{value}',
                  },
                  requestType: 'GET',
                  value: 'BB',
                },
                series: {
                  id: 5,
                  url: `${API_URL}api/seriesCode`,
                  parameters: {
                    q: '{search}',
                  },
                  requestType: 'GET',
                  value: 'CC',
                },
                style: {
                  id: 6,
                  url: `${API_URL}api/styleCode`,
                  parameters: {
                    q: '{search}',
                  },
                  requestType: 'GET',
                  value: 'DD',
                },
                bodyDescription: {
                  id: 7,
                  // permission: {
                  //   readOnlyControl: true,
                  // },
                  value: 'The body code description values',
                },
              },
            ],
          },
        },
        lopAndPartsSection: {
          id: 1,
          title: 'LOPs and Parts',
          // permission: {
          //   readOnlyControl: false,
          // },
          partGroup: {
            id: 1,
            title: 'Parts',
            parts: {
              title: 'Part number',
              values: [1234567980, 1234567890],
            },
            // permission: {
            //   readOnlyControl: false,
            // },
          },
          lopCriteriaGroup: {
            // permission: {
            //   readOnlyControl: false,
            // },
            id: 1,
            title: 'LOP Information',
            lopCriteriaList: [
              {
                id: 1,
                // permission: {
                //   readOnlyControl: false,
                // },
                lop: {
                  id: 1,
                  title: 'LOPs',
                  value: 334234,
                  // permission: {
                  //   readOnlyControl: false,
                  // },
                },
                failureCode: {
                  id: 2,
                  title: 'Failure code',
                  value: 'FC',
                  // permission: {
                  //   readOnlyControl: false,
                  // },
                },
              },
            ],
          },
        },
        salesCodesSection: {
          id: 5,
          title: 'Sales Code',
          helpText: 'Sales Code Section help',
          // permission: {
          //   readOnlyControl: true,
          // },
          salesCodesGroup: {
            id: 44,
            title: 'Sales Code',
            matchAllSalesCode: {
              id: 33,
              helpText: 'Match all Help',
              salesCodeEnum: 'MATCH_ALL_SALES_CODE',
            },
            salesCode: [
              {
                id: 55,
                helpText: 'Select the sales code',
                url: `${API_URL}api/salesCode`,
                parameters: {
                  q: '{search}',
                },
                requestType: 'GET',
                value: '-AL - BEIGE',
              },
              {
                id: 66,
                helpText: 'Select the sales code',
                url: `${API_URL}api/salesCode`,
                parameters: {
                  q: '{search}',
                },
                requestType: 'GET',
                value: 'VL - TRIM STYLE VL - LEATHER LOW BK BKT ST',
              },
            ],
          },
        },
        datesSection: {
          id: 10,
          title: 'Dates',
          hints:
            'Common date fields that will apply to the applicable data sources',
          // permission: {
          //   readOnlyControl: false,
          // },
          buildDateGroup: {
            // permission: {
            //   readOnlyControl: true,
            // },
            id: 1,
            title: 'Vehicle build date',
            helpText: 'The report date',
            dateRange: {
              fromDate: {
                date: '2022-06-25T00:00:00.000+00:00',
              },
              toDate: {
                date: '2022-06-26T00:00:00.000+00:00',
              },
            },
          },
          reportDateGroup: {
            id: 2,
            title: 'Report Date',
            helpText: 'The report date',
            dateRange: {
              fromDate: {
                date: '2022-07-25T00:00:00.000+00:00',
              },
              toDate: {
                date: '2022-07-26T00:00:00.000+00:00',
              },
            },
          },
          incidentDateGroup: {
            id: 3,
            title: 'Incident Date',
            helpText: 'The report incident date',
            dateRange: {
              fromDate: {
                date: '2022-09-25T00:00:00.000+00:00',
              },
              toDate: {
                date: '2022-09-26T00:00:00.000+00:00',
              },
            },
          },
        },
      })
    )
);
function currentData({ currentPage, itemsPerPage, data }) {
  const begin = (parseInt(currentPage, 10) - 1) * parseInt(itemsPerPage, 10);
  const end = begin + parseInt(itemsPerPage, 10);
  return data.slice(begin, end);
}
function currentDataForReactDataGrid({ skip, itemsPerPage, data }) {
  const begin = parseInt(skip, 10);
  const end = begin + parseInt(itemsPerPage, 10);
  return data.slice(begin, end);
}

const getRequestViewDataGrid = rest.get(
  `${API_URL}api/requests/data-grid`,
  (req, res, ctx) => {
    let paginatedData;
    let pagination;

    try {
      // eslint-disable-next-line camelcase
      const search_value = req.url.searchParams
        .get('search_value')
        ?.toLowerCase();
      const isReactDataGrid = req.url.searchParams.get('is_react_data_grid');
      const skip = req.url.searchParams.get('skip');
      // columnVisibility = JSON.parse(
      //   req.url.searchParams.get('visibility_colum')?.toLowerCase()
      // );

      const sort = JSON.parse(req.url.searchParams.get('sort'));
      const formattedSortData = {
        fields: [],
        order: [],
      };

      sort?.sort_model?.forEach((element) => {
        formattedSortData.fields.push(element.field);
        formattedSortData.order.push(element.sort);
      });

      const itemsPerPage = req.url.searchParams.get('limit')?.toLowerCase();
      const currentPage = req.url.searchParams.get('page')?.toLowerCase();

      const dataRow = dataGrid.rows.reduce((acc, row) => {
        if (new RegExp(search_value, 'i').test(row?.data?.traderName)) {
          return [...acc, row];
        }
        return acc;
      }, []);

      const sortedData = orderBy(
        dataRow,
        (row) =>
          row?.data?.[formattedSortData?.fields?.[0]]?.completion ||
          row?.data?.[formattedSortData?.fields?.[0]] ||
          row?.data?.[formattedSortData?.fields?.[0]],
        formattedSortData.order
      );
      pagination = {
        totalRowCount: dataRow?.length,
      };

      paginatedData = isReactDataGrid
        ? currentDataForReactDataGrid({
            skip,
            itemsPerPage,
            data: sortedData,
          })
        : currentData({
            currentPage,
            itemsPerPage,
            data: sortedData,
          });

      // omittedData = paginatedData.map((row) => {
      //   return omit(
      //     row,
      //     Object.keys(humps.camelizeKeys(columnVisibility))?.filter(
      //       (key) => key !== 'id'
      //     )
      //   );
      // });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
    }
    return res(
      ctx.delay(API_MOCK_DELAY),
      ctx.json({
        dataGridSection: {
          ...dataGrid,
          rows: paginatedData,
          pagination,
        },
      })
    );
  }
);

const mockFamily = [
  {
    value: 'AA',
    label: faker.random.words(),
    url: `${API_URL}api/familyCode`,
  },
  {
    value: 'BB',
    label: faker.random.words(),
    url: `${API_URL}api/familyCode`,
  },
  {
    value: 'CC',
    label: faker.random.words(),
    url: `${API_URL}api/familyCode`,
  },
  {
    value: 'DD',
    label: faker.random.words(),
    url: `${API_URL}api/familyCode`,
  },
  {
    value: 'EE',
    label: faker.random.words(),
    url: `${API_URL}api/familyCode`,
  },
  {
    value: 'FF',
    label: faker.random.words(),
    url: `${API_URL}api/familyCode`,
  },
  {
    value: 'GG',
    label: faker.random.words(),
    url: `${API_URL}api/familyCode`,
  },
  {
    value: 'HH',
    label: faker.random.words(),
    url: `${API_URL}api/familyCode`,
  },
];

const getFamilyByCode = rest.get(
  `${API_URL}api/familyCode`,
  (req, res, ctx) => {
    const q = req.url.searchParams.get('q')?.toLowerCase();
    return res(
      ctx.delay(API_MOCK_DELAY),
      ctx.json({
        data: q
          ? mockFamily.filter(
              (el) =>
                new RegExp(q, 'i').test(el.value) ||
                new RegExp(q, 'i').test(el.label)
            )
          : mockFamily,
      })
    );
  }
);

const mockLine = [
  { value: 'AA', label: faker.random.words(), url: `${API_URL}api/lineCode` },
  { value: 'BB', label: faker.random.words(), url: `${API_URL}api/lineCode` },
  { value: 'CC', label: faker.random.words(), url: `${API_URL}api/lineCode` },
  { value: 'DD', label: faker.random.words(), url: `${API_URL}api/lineCode` },
  { value: 'EE', label: faker.random.words(), url: `${API_URL}api/lineCode` },
  { value: 'FF', label: faker.random.words(), url: `${API_URL}api/lineCode` },
  { value: 'GG', label: faker.random.words(), url: `${API_URL}api/lineCode` },
  { value: 'HH', label: faker.random.words(), url: `${API_URL}api/lineCode` },
];
const getLineByCode = rest.get(`${API_URL}api/lineCode`, (req, res, ctx) => {
  const q = req.url.searchParams.get('q')?.toLowerCase();
  return res(
    ctx.delay(API_MOCK_DELAY),
    ctx.json({
      data: q
        ? mockLine.filter(
            (el) =>
              new RegExp(q, 'i').test(el.value) ||
              new RegExp(q, 'i').test(el.label)
          )
        : mockLine,
    })
  );
});

const mockSeries = [
  {
    value: 'AA',
    label: faker.random.words(),
    url: `${API_URL}api/seriesCode`,
  },
  {
    value: 'BB',
    label: faker.random.words(),
    url: `${API_URL}api/seriesCode`,
  },
  {
    value: 'CC',
    label: faker.random.words(),
    url: `${API_URL}api/seriesCode`,
  },
  {
    value: 'DD',
    label: faker.random.words(),
    url: `${API_URL}api/seriesCode`,
  },
  {
    value: 'EE',
    label: faker.random.words(),
    url: `${API_URL}api/seriesCode`,
  },
  {
    value: 'FF',
    label: faker.random.words(),
    url: `${API_URL}api/seriesCode`,
  },
  {
    value: 'GG',
    label: faker.random.words(),
    url: `${API_URL}api/seriesCode`,
  },
];
const getSeriesByCode = rest.get(
  `${API_URL}api/seriesCode`,
  (req, res, ctx) => {
    const q = req.url.searchParams.get('q')?.toLowerCase();
    return res(
      ctx.delay(API_MOCK_DELAY),
      ctx.json({
        data: q
          ? mockSeries.filter(
              (el) =>
                new RegExp(q, 'i').test(el.value) ||
                new RegExp(q, 'i').test(el.label)
            )
          : mockSeries,
      })
    );
  }
);
const mockStyles = [
  {
    value: 'AA',
    label: faker.random.words(),
    url: `${API_URL}api/styleCode`,
  },
  {
    value: 'BB',
    label: faker.random.words(),
    url: `${API_URL}api/styleCode`,
  },
  {
    value: 'CC',
    label: faker.random.words(),
    url: `${API_URL}api/styleCode`,
  },
  {
    value: 'DD',
    label: faker.random.words(),
    url: `${API_URL}api/styleCode`,
  },
  {
    value: 'EE',
    label: faker.random.words(),
    url: `${API_URL}api/styleCode`,
  },
  {
    value: 'FF',
    label: faker.random.words(),
    url: `${API_URL}api/styleCode`,
  },
  {
    value: 'GG',
    label: faker.random.words(),
    url: `${API_URL}api/styleCode`,
  },
  {
    value: 'HH',
    label: faker.random.words(),
    url: `${API_URL}api/styleCode`,
  },
];
const getStyleByCode = rest.get(`${API_URL}api/styleCode`, (req, res, ctx) => {
  const q = req.url.searchParams.get('q')?.toLowerCase();
  return res(
    ctx.delay(API_MOCK_DELAY),
    ctx.json({
      data: q
        ? mockStyles.filter(
            (el) =>
              new RegExp(q, 'i').test(el.value) ||
              new RegExp(q, 'i').test(el.label)
          )
        : mockStyles,
    })
  );
});

const getValuesByLookUpCode = rest.get(
  `${API_URL}api/lookups/values`,
  (req, res, ctx) => {
    return res(
      ctx.delay(API_MOCK_DELAY),
      ctx.json({
        data: Array(10)
          .fill(1)
          .map(() => faker.unique(faker.vehicle.manufacturer)),
      })
    );
  }
);

const mockKeywordsCriteria = [
  {
    value: 'Include : if match all',
    label: 'Include : if match all',
  },
  {
    value: 'Include : if match any',
    label: 'Include : if match any',
  },
  {
    value: 'Exclude : if match all',
    label: 'Exclude : if match all',
  },
  {
    value: 'Exclude : if match any',
    label: 'Exclude : if match any',
  },
];

const getKeywordsCriteria = rest.get(
  `${API_URL}api/keywords_criteria`,
  (req, res, ctx) => {
    const q = req.url.searchParams.get('q')?.toLowerCase();
    return res(
      ctx.delay(API_MOCK_DELAY),
      ctx.json({
        data: q
          ? mockKeywordsCriteria.filter(
              (el) =>
                new RegExp(q, 'i').test(el.value) ||
                new RegExp(q, 'i').test(el.label)
            )
          : mockKeywordsCriteria,
      })
    );
  }
);

const mockSalesCode = [
  { value: '+AR - Sales code +AR description' },
  { value: '+AN - Sales code +AN description' },
  { value: '+AB - Sales code +AB description' },
  { value: '+AE - Sales code +AE description' },
  { value: '-AL - BEIGE' },
  { value: 'VL - TRIM STYLE VL - LEATHER LOW BK BKT ST' },
];

const getSalesCode = rest.get(`${API_URL}api/salesCode`, (req, res, ctx) => {
  const q = req.url.searchParams.get('q')?.toLowerCase();
  return res(
    ctx.delay(API_MOCK_DELAY),
    ctx.json({
      data: q
        ? mockSalesCode.filter((el) =>
            new RegExp(handleRegexWithSpecialCharacters(q), 'i').test(el.value)
          )
        : mockSalesCode,
    })
  );
});

export const requestsViewHandler = [
  getFamilyByCode,
  getLineByCode,
  getSeriesByCode,
  getStyleByCode,
  getRequestsViewData,
  getRequestsViewSchema,
  getValuesByLookUpCode,
  getKeywordsCriteria,
  getSalesCode,
  getRequestViewDataGrid,
];
